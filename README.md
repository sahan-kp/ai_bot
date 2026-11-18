# NexaAI – Smart AI Chatbot

A complete React Native + Expo university assignment project using JavaScript, Expo Router, AsyncStorage, Expo Notifications, and a Node.js/Express backend with Google Gemini.

## 1. Student information

- Student Name: [ENTER FULL NAME]
- Student ID: [ENTER STUDENT ID]
- University: [ENTER UNIVERSITY NAME]
- Module: [ENTER MODULE NAME]
- Demo video: [PASTE DEMO VIDEO URL]

## 2. Features

- Premium dark-purple AI assistant UI
- Home dashboard with realistic sample data
- Expo Router tab navigation
- AI chat with loading state and offline fallback
- Gemini API through a secure backend
- Local conversation persistence with AsyncStorage
- Conversation history, open, delete, and clear
- React Hooks: useState, useEffect, useRef
- React Native AppState tracking and cleanup
- Local Android notifications and notification permission handling
- Editable student information placeholders
- Physical Android / Expo Go LAN testing instructions

## 3. Folder structure

```text
NexaAI/
├── app/
│   ├── _layout.js
│   └── (tabs)/
│       ├── _layout.js
│       ├── index.js
│       ├── chat.js
│       ├── history.js
│       └── settings.js
├── components/
├── data/
├── hooks/
├── utils/
├── backend/
├── assets/
├── app.json
├── babel.config.js
├── package.json
└── README_SINHALA.md
```

## 4. Requirements

- Node.js 22.13+ is recommended for Expo SDK 58.
- Android phone with Expo Go.
- PC and phone on the same Wi-Fi network.
- Optional Gemini API key for live AI.

Expo SDK 58 currently targets React Native 0.88 and Node.js 22.13.x or newer. Expo Router is included in the standard setup. See official Expo documentation for current compatibility. 

## 5. Install frontend

Open a terminal inside the `NexaAI` folder:

```bash
npm install
npx expo install
npx expo-doctor
```

If Expo Doctor reports a version mismatch, run:

```bash
npx expo install --fix
npx expo-doctor
```

## 6. Install backend

```bash
cd backend
npm install
```

Create `backend/.env` from `.env.example` and add your Gemini key:

```env
PORT=3000
GEMINI_API_KEY=YOUR_KEY
GEMINI_MODEL=gemini-2.5-flash-lite
```

Never commit `.env`.

## 7. Start backend

```bash
cd backend
npm start
```

Expected:

```text
NexaAI backend running at http://localhost:3000
```

Test:

```text
http://localhost:3000/health
```

## 8. Configure phone-to-PC backend connection

Do NOT use `localhost` from the Android phone.

On Windows:

```bash
ipconfig
```

Find your active Wi-Fi adapter's IPv4 address, for example:

```text
IPv4 Address . . . . . : 192.168.1.25
```

Then create a root `.env` file:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.25:3000
```

Replace the IP with your own PC IPv4 address.

Restart Expo after changing it:

```bash
npx expo start -c
```

Allow Node.js through Windows Firewall on private networks if the phone cannot reach `/health`.

## 9. Start Expo

From the project root:

```bash
npx expo start
```

Scan the QR code using Expo Go on Android.

If LAN discovery fails:

```bash
npx expo start --tunnel
```

For the live Gemini backend, LAN mode is normally the easiest because the phone must reach your PC's backend.

## 10. Notifications

This project uses `expo-notifications` for local notifications. Local notifications remain available in Expo Go, while remote push notification functionality on Android requires a development build in current Expo documentation.

On Android, open Settings > Notifications if permission is denied, then return to NexaAI and use **Test Notification (5s)**.

## 11. AI flow

```text
Android NexaAI
      |
      | POST /api/chat
      v
Node.js + Express
      |
      | Gemini API key stored only in backend/.env
      v
Google Gemini
      |
      v
AI response
      |
      v
NexaAI chat bubble
```

If the backend is unavailable, the app automatically shows a meaningful offline demo response and labels the source as Offline demo.

## 12. State management

- `useState`: chat messages, loading state, notification state, editable UI values.
- `useEffect`: initialization, AppState listener, notification setup, saved history.
- `useRef`: chat FlatList auto-scroll.
- Shared persistence: AsyncStorage stores conversations.

## 13. AppState

`useAppState.js` listens for active/background/inactive transitions, logs changes, displays the current state on Settings, and removes the listener during cleanup.

## 14. GitHub

Create a repository, then from the root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial NexaAI university assignment"
git remote add origin https://github.com/YOUR_USERNAME/NexaAI.git
git push -u origin main
```

Do not commit:
- `.env`
- `node_modules`
- temporary Expo output
- API keys

## 15. Demo video checklist

1. Open NexaAI.
2. Show populated Home dashboard.
3. Open Quick Prompt.
4. Send a chat message.
5. Show loading indicator.
6. Show AI response.
7. Explain Gemini/backend or Offline demo label.
8. Create a new chat.
9. Open History.
10. Reopen a previous conversation.
11. Delete a conversation.
12. Open Settings.
13. Show current AppState.
14. Put the app in background.
15. Return to foreground.
16. Show AppState changed.
17. Tap Test Notification.
18. Show the Android notification after about 5 seconds.
19. Explain AsyncStorage persistence.
20. Show GitHub repository.

## 16. Assignment completion matrix

| Requirement | Implementation |
|---|---|
| Standard Expo | Expo SDK 58 project |
| JavaScript | All application files are `.js` |
| Expo Router | `app/` routes and tab layout |
| Home | `app/(tabs)/index.js` |
| Chat | `app/(tabs)/chat.js` |
| History | `app/(tabs)/history.js` |
| Settings | `app/(tabs)/settings.js` |
| useState | Chat/settings/history |
| useEffect | Root/chat/settings |
| useRef | Chat FlatList |
| AppState | `hooks/useAppState.js` |
| Notifications | `utils/notifications.js` |
| AsyncStorage | `utils/storage.js` |
| Backend | `backend/server.js` |
| Gemini | Backend `@google/genai` |
| Secure key | Backend `.env` |
| Offline fallback | `utils/ai.js` |
| Documentation | README + Sinhala README |
| GitHub readiness | `.gitignore` + commands |

## 17. Troubleshooting

### `Network request failed`
1. Confirm backend is running.
2. Confirm phone and PC are on the same Wi-Fi.
3. Replace the LAN IP in root `.env`.
4. Test the PC IP from the phone browser: `http://YOUR_PC_IP:3000/health`.
5. Check Windows Firewall.
6. Restart Expo with `npx expo start -c`.

### Expo version mismatch
```bash
npx expo install --fix
npx expo-doctor
```

### Gemini unavailable
The app intentionally falls back to local demo responses. Check `backend/.env`, Gemini API key, backend console, and `/health`.

### Notification does not appear
Check Android notification permission and ensure the app is running on a physical Android device for the assignment demonstration. Local notifications are supported in Expo Go; remote push is a different setup.

## 18. Submission

Before submitting, replace the four student placeholders, add your demo video URL, test the app on your Android phone, run `npx expo-doctor`, and confirm `.env` is not in Git.
