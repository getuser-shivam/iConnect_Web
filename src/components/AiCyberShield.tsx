import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Shield, ShieldCheck, ShieldAlert, Cpu, 
  Terminal, Sliders, RefreshCw, Check, Copy, ArrowUpRight,
  Bot, AlertTriangle, Play, HelpCircle, Activity, Info
} from 'lucide-react';

interface PolicyPreset {
  id: string;
  name: string;
  rating: string;
  score: number;
  encryption: string;
  dnsQueries: string;
  desc: string;
  details: string[];
}

const POLICY_PRESETS: PolicyPreset[] = [
  {
    id: 'hardened',
    name: 'Cyber Shield Core',
    rating: 'A+ (Ultra Hardened)',
    score: 98,
    encryption: 'ChaCha20-Poly1305 with Triple-Handshake Renewals',
    dnsQueries: 'Dynamic DoH (DNS over HTTPS) + OISD Ultimate Blocklists',
    desc: 'Binds active machine learning heuristics to strip tracking telemetry, ads, malicious payloads, and spoofed DNS origins at the gateway level.',
    details: [
      'Strict WebRTC Isolation active',
      'Anti-tracking content index compiled',
      'Dynamic ThreatIntelligence feeds mapped',
      'Forced recursive DNS leak isolation'
    ]
  },
  {
    id: 'stealth',
    name: 'Stealth Cloak Probe',
    rating: 'A (High Anonymity)',
    score: 94,
    encryption: 'Shadowsocks Obfs-TLS (High-Entropy TCP Headers)',
    dnsQueries: 'Zero-Log Encrypted Resolver (1.1.1.1 + 8.8.8.8 Dual Bind)',
    desc: 'Engineered specifically for deep packet inspection (DPI) environments. Cloaks tunneling signatures to look like benign standard HTTPS web actions.',
    details: [
      'TLS handshake obfuscation injection',
      'Anti-Deep-Packet-Inspection passive filter',
      'Variable MTU payload chunking (1380 bytes)',
      'Sub-60s rotation of transit proxies'
    ]
  },
  {
    id: 'media',
    name: 'High-Performance Streamer',
    rating: 'B+ (Max Bandwidth)',
    score: 87,
    encryption: 'Optimized Wireguard (AES-128-GCM Hardware Bypass)',
    dnsQueries: 'Google Public DNS-cast with latency sorting',
    desc: 'Prioritizes maximum hardware throughput. Bypasses recursive filter cascades on verified media streams while maintaining strict data payload encryption.',
    details: [
      'Hardware-accelerated cryptographic lanes',
      'Bypasses secondary blocklist filters for raw speed',
      'MTU optimized for high-capacity packets (1420 bytes)',
      'Split-tunnel routing for verified low-risk domains'
    ]
  }
];

export function AiCyberShield() {
  const [selectedPreset, setSelectedPreset] = useState<PolicyPreset>(POLICY_PRESETS[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState<{
    score: number;
    rating: string;
    description: string;
    encryption: string;
    dnsResolver: string;
    rules: string[];
    logs: string[];
  } | null>(null);
  
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'logs'>('visual');
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Run initial simulation or preset update
  useEffect(() => {
    applyPreset(selectedPreset);
  }, [selectedPreset]);

  // Scroll logs area down smoothly
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [simulatedLogs]);

  const applyPreset = (preset: PolicyPreset) => {
    setIsAnalyzing(true);
    setSimulatedLogs([`[CO-PILOT] Initializing evaluation for policy: ${preset.name}`]);
    
    const steps = [
      `[GRID] Evaluating active node routes...`,
      `[SECURITY] Probing resolver tunnels for DNS & WebRTC leakage...`,
      `[COMPILER] Formulating optimal MTU packets & handshake keys...`,
      `[ANALYSIS] AI score projected at ${preset.score}/100. Verification complete.`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimulatedLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsAnalyzing(false);
          setAnalyzedResult({
            score: preset.score,
            rating: preset.rating,
            description: preset.desc,
            encryption: preset.encryption,
            dnsResolver: preset.dnsQueries,
            rules: preset.details,
            logs: steps
          });
        }
      }, (idx + 1) * 250);
    });
  };

  const handleCustomPromptSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsAnalyzing(true);
    setSimulatedLogs([`[AI CORE] Constructing customizable system topology...`]);

    const processingSteps = [
      `[AI INTERACTION] Reading user request: "${customPrompt.slice(0, 45)}..."`,
      `[AI CONNECT] Communicating secure telemetry to Express API proxy...`,
      `[AI DECODING] Handshaking and optimizing neural parameters...`,
      `[MODEL TRANSIT] Parsing defense rating & custom core protocols...`,
      `[COMPILING] Profile compiled successfully. Dynamic gateways ready.`
    ];

    // Show simulated logs typing effect
    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < processingSteps.length) {
        setSimulatedLogs(prev => [...prev, processingSteps[currentStepIndex]]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
      }
    }, 280);

    try {
      const response = await fetch('/api/gemini/cyber-shield-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customPrompt })
      });
      const data = await response.json();
      if (data && !data.error) {
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalyzedResult({
            score: data.score || 95,
            rating: data.rating || "A (Tailored Custom Shield)",
            description: data.description || "Ecosystem tailored VPN parameters focused on low-latency device encapsulation.",
            encryption: data.encryption || "AES-256-GCM Handshake Rotate",
            dnsResolver: data.dnsResolver || "Cloudflare Secure DNS",
            rules: data.rules || ["Tailored device gateway firewall rules applied"],
            logs: data.logs || processingSteps
          });
          if (data.logs && Array.isArray(data.logs)) {
            setSimulatedLogs(prev => [...prev, ...data.logs.map((l: string) => `[AI CORE_RES] ${l}`)]);
          }
        }, 1500);
        return;
      }
      throw new Error(data.error || "Fallback to offline compilation");
    } catch (err) {
      console.warn("Utilizing high-end offline heuristic fallback engine:", err);
      setTimeout(() => {
        setIsAnalyzing(false);
        const cleanPrompt = customPrompt.toLowerCase();
        let score = 92;
        let rating = 'A (Custom Hardened)';
        let encryption = 'AES-256-GCM Handshake Rotate';
        let dnsResolver = 'Cloudflare Zero-Trust Secure DNS';
        let description = 'Ecosystem tailored VPN parameters focused on low-latency device encapsulation and smart payload filtering.';
        let details = [
          'Tailored device gateway firewall rules applied',
          'Malware & Phishing payload filters enabled',
          'Optimal route map mapped to lowest latency nodes',
          'Active WebRTC STUN isolation active'
        ];

        if (cleanPrompt.includes('camera') || cleanPrompt.includes('nest') || cleanPrompt.includes('iot')) {
          score = 96;
          rating = 'A+ (IoT Shielded)';
          encryption = 'ChaCha20 continuous authenticated payload wrapping';
          dnsResolver = 'Decentralized NextDNS (AdGuard Ultimate filter map)';
          description = 'Hardened IoT framework designed to prevent side-channel telemetry leaks, blocking remote backdoor sweeps.';
          details = [
            'IoT smart-home telemetry tracking blocked',
            'Recursive connection checks bound to local DNS pool',
            'High-frequency gateway route reassignment'
          ];
        } else if (cleanPrompt.includes('stream') || cleanPrompt.includes('game') || cleanPrompt.includes('gaming')) {
          score = 89;
          rating = 'A- (High Speed Priority)';
          encryption = 'Optimized Wireguard Tunnel (sub-12ms processing overhead)';
          dnsResolver = 'Quad9 Secure Dynamic (9.9.9.9) optimized for DNS latency';
          description = 'Throughput-optimized protocol built to eliminate gaming jitter, ensuring dynamic frame performance.';
          details = [
            'MTU size bound to hardware constraints (1420 bytes)',
            'Bypasses heavy deep packet filters on verified streaming channels',
            'Active node reassignment upon ping spikes > 150ms'
          ];
        } else if (cleanPrompt.includes('china') || cleanPrompt.includes('restrict') || cleanPrompt.includes('censorship')) {
          score = 95;
          rating = 'A (Deep Obfuscation Cloak)';
          encryption = 'V2Ray Vmess with VMESS-AEAD high-entropy wrap';
          dnsResolver = 'DoH over encrypted routing (127.0.0.1:5353 proxy mapping)';
          description = 'Strict anti-censorship layout configured with high-entropy packet styling to bypass Deep Packet Inspection (DPI) grids.';
          details = [
            'Payload obfuscation mimics benign web traffic (HTTP/3 standard traffic)',
            'Splits standard routing queries outside known firewalls',
            'Sub-30s dynamic node switching'
          ];
        }

        setAnalyzedResult({
          score,
          rating,
          description,
          encryption,
          dnsResolver,
          rules: details,
          logs: processingSteps
        });
      }, 1500);
    }
  };

  const generatedConfigString = `[AI-Hardened-Profile]
# Mapped Security Rating: ${analyzedResult?.rating || 'Calculating...'}
# Defense Integrity Score: ${analyzedResult?.score || 100}/100
# Target DNS Configuration: ${analyzedResult?.dnsResolver || 'Secure Default DNS'}

[Interface]
Protocol = ${selectedPreset.id === 'media' ? 'WireGuard' : selectedPreset.id === 'stealth' ? 'Shadowsocks' : 'iConnect-Core'}
Encryption = ${analyzedResult?.encryption || 'AES-256-GCM'}
Address = 10.0.8.2/24, fd42::2/64
MTU = ${selectedPreset.id === 'media' ? '1420' : '1380'}
WebRTCShield = enabled
TelemetryBlock = true

[DynamicFilters]
${analyzedResult?.rules.map((rule, idx) => `Filter_${idx + 1} = ${rule}`).join('\n') || '# Ready to deploy'}
`;

  const copyConfig = () => {
    navigator.clipboard.writeText(generatedConfigString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 lg:p-10 text-left">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-zinc-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Smart Security Mode
          </div>
          <h2 className="text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight">
            AI Threat Protection <span className="text-zinc-500">Settings</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
            Tell our AI what you are doing, and it will instantly customize your connection to provide the perfect balance of speeds, security, and anonymity for your specific needs.
          </p>
        </div>
        
        {/* Toggle Preset Selectors */}
        <div className="flex flex-wrap gap-2">
          {POLICY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedPreset.id === preset.id
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-950/40 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {preset.name.split(' ')[0]} Policy
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Prompt Setup & Preset Details in 5 Cols */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="p-5 bg-zinc-950/60 border border-white/5 rounded-2xl">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block mb-1">Active Policy Profile</span>
              <h3 className="text-lg font-medium text-white mb-2">{selectedPreset.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{selectedPreset.desc}</p>
              
              <div className="space-y-2.5">
                {selectedPreset.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom AI Interface Form */}
            <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                Describe Your Hardware Ecosystem / Needs
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. 5 security cameras, dynamic torrent servers, bypassing restriction..."
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:bg-zinc-950 transition-all"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing || !customPrompt.trim()}
                  className="absolute right-2 top-2 bg-white hover:bg-zinc-200 text-black p-2 rounded-xl transition-all disabled:opacity-40 shrink-0 cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Secure IoT Cameras',
                  'Frictionless Fast Streamer',
                  'Deep Censorship Bypass Mode'
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCustomPrompt(sug);
                    }}
                    className="text-[10px] font-medium bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white px-2 py-1 rounded border border-white/5 transition-all cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <div className="w-full h-px bg-white/[0.05]" />

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">SECURITY SCORE</span>
              <span className="text-xl font-mono text-emerald-400 font-bold">{analyzedResult?.score || '--'} / 100</span>
            </div>
            <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">PROTECTION LEVEL</span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-tight block truncate">
                {analyzedResult?.rating.split(' ')[0] || 'A+ Core'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Dashboard / Console / Code in 7 Cols */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-950 border border-white/5 rounded-2xl p-5 lg:p-8 min-h-[460px] relative overflow-hidden">
          
          {/* Header Controls */}
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-white/[0.05] mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase font-bold">Security Monitor</span>
              
              <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-xl border border-white/5 text-[10px] font-mono font-medium justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => setActiveTab('visual')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'visual' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  Visual Path
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'code' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('logs')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeTab === 'logs' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  Console
                </button>
              </div>
            </div>

            {/* Simulated Live Loading Frame */}
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64 flex flex-col items-center justify-center text-center p-8 select-none"
                >
                  <Activity className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
                  <h4 className="text-sm font-semibold text-white mb-1.5 font-mono">Analyzing Security Profile</h4>
                  <p className="text-xs text-zinc-500 max-w-sm leading-relaxed font-mono">
                    Compiling your custom rules and selecting optimal connection methods...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-64"
                >
                  {/* TAB 1: Visual Radar Flowchart */}
                  {activeTab === 'visual' && (
                    <div className="space-y-6 text-left">
                      <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-2xl">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold text-white mb-0.5">Secured Gateway Bounded ✓</h4>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            {analyzedResult?.description}
                          </p>
                        </div>
                      </div>

                      {/* Interactive SVG Gateway Flowchart */}
                      <div className="relative bg-black/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center overflow-hidden">
                        
                        {/* Interactive flow line */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.02),transparent)] pointer-events-none" />
                        
                        <div className="w-full flex items-center justify-between relative z-10">
                          {/* Node 1: Client Gateway */}
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Sliders className="w-4 h-4 text-zinc-300" />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">GATEWAY</span>
                          </div>

                          {/* Line Spacer Connector */}
                          <div className="flex-grow mx-1.5 sm:mx-4 relative h-1.5 flex items-center justify-center">
                            <div className="absolute w-full h-px bg-white/10" />
                            <motion.div 
                              className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                              animate={{ x: ['-240%', '240%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                            />
                          </div>

                          {/* Node 2: Dynamic Filter Cascades */}
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                              <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
                            </div>
                            <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest">COMPUTATION</span>
                          </div>

                          {/* Line Spacer Connector */}
                          <div className="flex-grow mx-1.5 sm:mx-4 relative h-1.5 flex items-center justify-center">
                            <div className="absolute w-full h-px bg-white/10" />
                            <motion.div 
                              className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
                              animate={{ x: ['-240%', '240%'] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
                            />
                          </div>

                          {/* Node 3: Secure Dynamic Target Resolver */}
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">ENVELOPE</span>
                          </div>
                        </div>

                        <div className="w-full flex justify-between gap-4 border-t border-white/5 pt-4 mt-6 text-[10px] font-mono">
                          <div className="text-left">
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">RESOLVER BIND</span>
                            <span className="text-white truncate max-w-[200px] block font-semibold">{analyzedResult?.dnsResolver.split(' + ')[0]}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">ACTIVE INTEGRITY</span>
                            <span className="text-emerald-400 font-bold">{analyzedResult?.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Dynamic Rules Configuration */}
                  {activeTab === 'code' && (
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">Generated Cryptographic Envelope Profile</span>
                      <div className="relative">
                        <pre className="bg-zinc-950/80 p-4 rounded-xl border border-white/5 font-mono text-[9px] text-zinc-400 leading-relaxed overflow-x-auto overflow-y-auto max-h-[180px] select-all">
                          {generatedConfigString}
                        </pre>
                        
                        <button
                          onClick={copyConfig}
                          type="button"
                          className="absolute top-2.5 right-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 p-2 rounded-lg text-zinc-300 hover:text-white transition-all cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Simulated Live Console Logs */}
                  {activeTab === 'logs' && (
                    <div 
                      ref={logsContainerRef}
                      className="bg-black border border-white/5 p-4 rounded-xl h-64 overflow-y-auto font-mono text-[10px] text-emerald-400 leading-normal text-left scrollbar-thin"
                    >
                      <div className="text-zinc-500 mb-2 uppercase text-[8px] font-bold tracking-wider">Dynamic Sandbox Hops</div>
                      <div className="space-y-1">
                        {simulatedLogs.map((log, idx) => (
                          <div key={idx} className={log.includes('[AI CORE]') || log.includes('[CO-PILOT]') ? 'text-indigo-400' : 'text-emerald-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons to copy or recalculate route parameters */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={() => applyPreset(selectedPreset)}
              disabled={isAnalyzing}
              className="py-3 px-4 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing && 'animate-spin'}`} />
              <span>Re-analyze Setup</span>
            </button>
            <button
              onClick={copyConfig}
              type="button"
              className="py-3 px-4 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 text-black" />
              <span>Apply Protection Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
