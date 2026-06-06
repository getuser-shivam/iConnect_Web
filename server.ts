import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing in project secrets");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Server-side Gemini Play Store Compliance Optimization endpoint
  app.post("/api/gemini/playstore-metadata", async (req, res) => {
    try {
      const { appName, keyFeatures, targetAudience } = req.body;
      const client = getGeminiClient();

      const systemInstruction = 
        "You are an expert Google Play Store compliance advisor and marketing psychologist specializing in VPN & security apps. " +
        "Google Play's VpnService Policy is extremely strict: apps must declare exact, clear usage of VpnService, " +
        "explain that the core functionality is a local encrypted tunnel, and never promise absolute untraceability or bypasses. " +
        "You must generate listing metadata that is fully compliant, persuasive, and safe from store rejection.";

      const prompt = `Generate compliant Google Play Store listing metadata for our application:
        - App Name: ${appName || "iConnect: VPN & DNS"}
        - Core Features to include: ${keyFeatures || "Ultra Low-latency pings, customizable DoH DNS presets, automatic WebRTC leak shields, zero-log data erasure"}
        - Target Audience: ${targetAudience || "Tech-savvy individuals seeking security and low-latency performance"}

        Return the response in structured JSON matching this EXACT schema:
        {
          "shortDescription": "A concise, engaging short description of the app under 80 characters.",
          "fullDescription": "A comprehensive app description (300-500 words). It MUST include a clear section explaining VpnService utilization, explaining that android.net.VpnService is used to establish a secure, local, and encrypted tunnel to route packet traffic securely at the gateway level, conforming perfectly with Google Developer guidelines.",
          "complianceHighlights": [
            "Highlight 1 of compliance: VpnService declared correctly in UI/docs",
            "Highlight 2 of compliance: Clear, accessible delete-account / GDPR wipe function",
            "Highlight 3 of compliance: Strict privacy with zero injection of tracker scripts"
          ],
          "reviewerRationales": "A brief explanation for the Google Play review team summarizing how this app aligns with their policies (under 100 words)."
        }
        
        Do not add any Markdown code blocks or wrapping strings around the output. Just return the raw JSON object.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Gemini API Error:", error.message);
      res.status(500).json({ 
        error: "Failed to optimize store metadata.", 
        details: error.message,
        isKeyMissing: error.message.includes("missing in project secrets")
      });
    }
  });

  // Server-side Gemini Cyber Shield Profiler endpoint
  app.post("/api/gemini/cyber-shield-analyze", async (req, res) => {
    try {
      const { customPrompt } = req.body;
      const client = getGeminiClient();

      const systemInstruction = 
        "You are an expert cybersecurity co-pilot embedded inside the iConnect VPN utility. " +
        "Your task is to analyze custom network requirements and generate ultra-hardened security configurations " +
        "and parameters. You must output the defense integrity score, a custom descriptive rating, " +
        "recommended encryption protocol & cipher, tailored DNS querying strategies, dynamic routing rules, " +
        "and simulated diagnostic console steps showing compiling details.";

      const prompt = `Analyze the following network requirement and output highly optimized, custom cybersecurity profiles in JSON.
        Requirement: "${customPrompt || "A secure streaming shield for restrictive internet connections"}"

        Return the response in structured JSON matching this EXACT schema:
        {
          "score": 95,
          "rating": "A+ (Censorship Stealth Cloak)",
          "description": "Tailored parameters focusing on obfuscation, low-latency device encapsulation and deep threat telemetry bypassing.",
          "encryption": "V2Ray Vmess + AEAD high-entropy cipher",
          "dnsResolver": "DoH (Google Security Resolver Dual Bind with zero-log parsing)",
          "rules": [
            "Obfuscated handshakes mimicking benign TLS browsing traffic",
            "Automated MTU optimization set to 1340 bytes to bypass strict carrier packet drops",
            "Low-latency transit node rotating every 45-second threshold"
          ],
          "logs": [
            "[AI CO-PILOT] Analyzing user ecosystem constraints...",
            "[THREAT INTEL] Cross-checking against known deep packet search vectors...",
            "[TUNNEL ENG] Aligning high-entropy MTU coefficients...",
            "[SYSTEM COMPILER] Profile compiled successfully. Dynamic gateways ready."
          ]
        }
        
        Do not add any Markdown code blocks or wrapping strings around the output. Just return the raw JSON object.`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Gemini API Error for Cyber Shield:", error.message);
      res.status(500).json({ 
        error: "Failed to generate AI custom profile.", 
        details: error.message,
        isKeyMissing: error.message.includes("missing in project secrets")
      });
    }
  });

  // Vite middleware for development (runs when NODE_ENV is not explicitly production)
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
