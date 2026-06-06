# Deploying iConnect Website to Google Studio

This guide explains how to deploy the iConnect website to Google Studio (at `iconnect.run`) and configure the required environment variables.

## 1. Prerequisites

- The website is a Node.js/Vite application.
- Ensure you have the updated codebase containing the Deep Blue & Electric Cyan theme.

## 2. Environment Variables

The website relies on the Gemini API for the AI Cyber Shield profile generator and the Play Store compliance logic. You must set the following environment variable in your Google Studio project settings or `.env` configuration:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: This is the key provided for the iConnect project. Keep it secure and do not expose it in the frontend codebase.

## 3. Build Instructions

When configuring your deployment in Google Studio (or equivalent Node.js hosting platform), use the following build command:

```bash
npm install
npm run build
```

This will bundle the frontend using Vite and compile the `server.ts` Express server into the `dist` directory.

## 4. Start Command

Set the start/run command in your Google Studio configuration to:

```bash
npm run start
```

This starts the bundled Node.js express server which serves both the API endpoints and the frontend static files.

## 5. Domain Configuration

Ensure your custom domain `iconnect.run` is properly routed to the Google Studio deployment endpoint. If the SSL certificate is managed by Google Studio, ensure it has been fully provisioned.

## 6. Verifying Deployment

Once deployed:
1. Navigate to `https://iconnect.run`.
2. Check that the theme is Deep Blue / Electric Cyan.
3. Test the "Direct Support" form or AI Cyber Shield tool to ensure the Gemini API is correctly interacting with your backend server.
