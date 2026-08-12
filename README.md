# 🖥️ Sentinel Dashboard

Live Demo: [Sentinel Dashboard](https://sentinel-dashboard-1hcu8wmhh-manshiii28s-projects.vercel.app)


A live monitoring dashboard for the Sentinel API gateway, built in React. It shows every registered client with its rate-limiting configuration and status, alongside a real-time feed of the last 20 requests passing through the gateway — auto-refreshing every few seconds.

This dashboard talks directly to the [Sentinel backend](https://github.com/Manshiii28/sentinel)'s admin API, so anything visible here reflects live gateway activity.

## Features

- **Client overview** — name, rate-limiting algorithm (Token Bucket / Sliding Window), configured limit, and active/blocked status for every registered client
- **One-click block/unblock** — instantly toggle a client's access without touching the backend directly
- **Live request feed** — the last 20 requests through the gateway, with client, endpoint, outcome (allowed/denied/flagged), and timestamp
- **Auto-refresh** — the dashboard polls the backend every few seconds so the view stays current without manual reloads

## Tech stack

- React + Vite
- Axios for API calls

## Running locally

```bash
npm install
npm run dev



Part of the Sentinel project
🛡️ sentinel — main API gateway backend
🐍 sentinel-ml — Python Isolation Forest anomaly detection service
