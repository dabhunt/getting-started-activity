Background and Motivation
- Need to expose local Vite dev server over Cloudflare Tunnel for external access. Vite blocked the tunnel hostname with “Blocked request. This host is not allowed.”

Key Challenges and Analysis
- Vite 5 enforces host checks; requires `server.allowedHosts` to include external hostname(s).
- Cloudflare Quick Tunnels generate ephemeral `*.trycloudflare.com` hostnames each run.
- HMR over HTTPS requires `hmr.clientPort: 443` when accessed via HTTPS tunnel.

High-level Task Breakdown
1) Update `client/vite.config.js` to allow `.trycloudflare.com` and the current tunnel host. Success: Vite serves without “Blocked request” error when accessed via tunnel.
2) Verify tunnel access by starting Vite and running `cloudflared tunnel --url http://localhost:5173`. Success: Page loads over trycloudflare URL; HMR functions.
3) Optional: Document stable named tunnel steps for a custom domain. Success: Config snippet available; not executed yet.

Project Status Board
- [x] Allow Cloudflare Tunnel hosts in Vite (`server.allowedHosts`)
- [ ] Verify Quick Tunnel end-to-end (start Vite, start cloudflared, test URL)
- [ ] Decide whether to create a permanent named tunnel (optional)

Current Status / Progress Tracking
- Implemented `allowedHosts` with `.trycloudflare.com` and current host `vote-how-minimal-pgp.trycloudflare.com`. HMR `clientPort` already set to 443.
- Pending: Run Vite (port 5173) and `cloudflared tunnel --url http://localhost:5173`, then open the provided URL.

Executor's Feedback or Assistance Requests
- Please run:
  - In `client/`: `npm run dev`
  - In another terminal: `cloudflared tunnel --url http://localhost:5173`
- Share the tunnel URL if issues persist so we can verify host matching. If you prefer a stable subdomain, I can set up a named tunnel and `config.yml`.

Lessons
- When using Vite 5 with reverse proxies/tunnels, set `server.allowedHosts` to include the external host(s). A suffix wildcard like `.trycloudflare.com` prevents repeated edits for new ephemeral hosts.

