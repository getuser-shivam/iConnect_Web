# Deployment & Hosting Documentation

This document outlines the architecture, deployment process, and domain configuration used to host **iConnect** on **Google Cloud Platform (GCP)** and connect it to a custom domain registered via **Hostinger**.

---

## 1. Architecture Overview

The application is hosted using a modern serverless container architecture:
- **Application Stack:** React, Vite, TypeScript, Node.js.
- **Hosting Provider:** Google Cloud Run (Serverless Container Platform).
- **Domain Registrar / DNS Manager:** Hostinger.
- **SSL/TLS:** Managed automatically by Google Cloud.

Google Cloud Run automatically scales containers based on web traffic and scales to zero when idle, making it highly cost-effective and performant.

---

## 2. Google Cloud Deployment (Cloud Run)

The previous "Teleport" deployment script relies on an AI Studio internal container registry that your personal Google Cloud project (`gen-lang-client-0292010287`) does not have access to. That is why you encountered the `Cannot find service` error in your Cloud Shell terminal.

The easiest and official way to update your specific service (`iconnect-vpn-dns` in the `asia-southeast1` region) is to use AI Studio's direct export deployment, or deploy from source in your Cloud Shell.

### How to Update Your Live Application (Correct Method)

**Option A: Deploy Directly via AI Studio (Recommended)**
1. In AI Studio, click the **Settings / Gear Icon** in the top right.
2. Select **Deploy to Google Cloud Run**.
3. Choose your Project (`gen-lang-client-0292010287`).
4. Select the Region: `asia-southeast1`.
5. Enter your existing service name: `iconnect-vpn-dns`.
6. Click Deploy. This directly builds and updates your live `iconnect.run` site.

**Option B: Deploy via Cloud Shell (From Source)**
If you prefer to use the Cloud Shell terminal shown in your screenshot:
1. In AI Studio, click the **Settings / Gear Icon** and select **Export > Download as ZIP**.
2. Open your Google Cloud Shell.
3. Upload the ZIP file into your Cloud Shell and extract it.
4. Run the following command inside the extracted folder:

```bash
gcloud run deploy iconnect-vpn-dns \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 3000 \
  --project gen-lang-client-0292010287
```

*(This command reads your source code, automatically configures the container using Google Cloud Buildpacks, and updates the exact service mapped to `iconnect.run`.)*

---

## 3. Custom Domain & DNS Setup

This is the final piece of the puzzle to make `iconnect.run` professional:

### Step 3.1: Ownership Verification
1. Add a `google-site-verification` TXT record to Hostinger to prove ownership to Google.
2. Verify ownership in **Google Search Console / Webmaster Central**.

### Step 3.2: Domain Mapping
We map both `iconnect.run` and `www.iconnect.run` to the Singapore Cloud Run service using the `gcloud` CLI or the Cloud Console.

### Step 3.3: DNS Records
We update Hostinger's DNS Zone with the IP addresses provided by Google Cloud:
- **4 A Records** (IPv4 addresses).
- **4 AAAA Records** (IPv6 addresses).
- **1 CNAME Record** (Alias: `www` pointing to `ghs.googlehosted.com`).

---

## 4. How to Update Your App in the Future

When you make changes to the code in AI Studio and want them live on `iconnect.run`, use **Option A** (Deploy Directly via AI Studio) outlined in section 2. It is the fastest and most reliable method to get your changes live.

✅ **Current Status: LIVE**
- **URL:** `https://iconnect.run`
- **Database / App:** Singapore (`iconnect-vpn-dns`)
- **SSL:** Active (Green Padlock)
