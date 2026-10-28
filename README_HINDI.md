# PROJECT CRICKETVERSE — Hindi Setup Guide

## इस पैकेज में क्या है?
- `index.html`: मुख्य गेम वेबसाइट और मेन्यू।
- `match3d.html`: 3D क्रिकेट मैदान, काल्पनिक 3D खिलाड़ी, कैमरा घुमाना/ज़ूम, बॉल एनिमेशन, स्कोर और शॉट बटन।
- `server/`: Node.js + Socket.IO का ऑनलाइन रूम सर्वर।
- `data/`: टीम और फॉर्मेट का डेटा।

## GitHub पर वेबसाइट लाइव करें
1. ZIP को मोबाइल/कंप्यूटर में Extract करें।
2. इसके अंदर की सभी फ़ाइलें और फ़ोल्डर `project-cricketverse` repository के root में अपलोड करें। ZIP फ़ाइल को सीधे अपलोड न करें।
3. GitHub में `Settings → Pages → Deploy from a branch → main → /(root) → Save` चुनें।
4. लाइव वेबसाइट में **OPEN 3D MATCH ARENA** दबाएँ।

## Online Multiplayer चालू करना
GitHub Pages सिर्फ static website चलाता है; Node.js server वहाँ नहीं चल सकता। `server` फ़ोल्डर को WebSocket support वाले Node host पर अलग deploy करें:
- Build command: `npm install`
- Start command: `npm start`
- `ALLOWED_ORIGINS` environment variable में अपनी GitHub Pages वेबसाइट का origin दें, जैसे `https://YOUR-USERNAME.github.io`।

फिर server का HTTPS URL 3D Match Arena के **Server URL** बॉक्स में डालकर **CONNECT ONLINE SERVER** दबाएँ। उसके बाद room बनाएँ और code दोस्त को भेजें।

## जरूरी सच
यह playable prototype है, पूरा commercial Real Cricket जैसा गेम नहीं। Runs/wickets अभी simulated हैं। Server room create/join और shot events broadcast करता है, लेकिन authoritative physics, anti-cheat, accounts, matchmaking, cloud saves और full match engine अभी अलग से बनाने होंगे।
