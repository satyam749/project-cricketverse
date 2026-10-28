# PROJECT CRICKETVERSE — GitHub-ready 3D prototype

This package contains a deployable static website plus a separate Node.js Socket.IO room-server starter.

## What works now
- `index.html`: cinematic CricketVerse home/menu, responsive CSS and generated artwork.
- `match3d.html`: interactive Three.js cricket ground with a 3D pitch, fictional player models, orbit/zoom camera, ball animation, score HUD, shot buttons and simulated batting outcomes.
- Landscape/fullscreen attempt with a CSS fallback. Browsers may block orientation locking; use the phone's Auto-rotate setting if needed.
- `server/server.js`: real-time room creation/joining and shot-event broadcasting between up to two connected clients per room.
- Team/format data JSON files.

## Publish the website on GitHub Pages
1. Upload the contents of this folder to the **root** of your `project-cricketverse` repository (do not upload the ZIP itself).
2. In GitHub, open **Settings → Pages**.
3. Select **Deploy from a branch**, branch `main`, folder `/(root)`, and Save.
4. Open the published site and choose **OPEN 3D MATCH ARENA**.

The site uses Three.js and Socket.IO client from public CDNs, so those libraries need internet access in the browser.

## Turn on online rooms (separate server deployment required)
GitHub Pages only serves static files; it cannot run this Node server. Deploy `server/` to a Node.js host that supports WebSockets (for example, Render, Railway, or another Node host):
1. Set the service root directory to `server` (or deploy that directory as the service root).
2. Build command: `npm install`
3. Start command: `npm start`
4. Set environment variable `ALLOWED_ORIGINS` to your GitHub Pages origin, e.g. `https://YOUR-USERNAME.github.io` (no trailing slash). For a quick test, `*` is the default; restrict it for production.
5. Copy the deployed HTTPS service URL. In `match3d.html`, enter it in **Server URL** and tap **CONNECT ONLINE SERVER**. Create a room and share its code with another player.

## Important limits
This is a playable **prototype foundation**, not a finished commercial cricket simulator. Batting outcomes are simulated, and the server broadcasts shot events but does not yet run an authoritative ball-physics/match engine, account system, anti-cheat, persistent stats, matchmaking, or production security. A full 3D match game needs additional engineering and testing. Player models are fictional; no licensed real-player faces, logos or team branding are included.
