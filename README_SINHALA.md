# NexaAI – Sinhala Setup Guide

## 1. මුලින්ම අවශ්‍ය දේ

- Windows PC
- Node.js 22.13+ 
- Android phone
- Expo Go
- PC සහ phone එක එකම Wi-Fi network එකක

## 2. ZIP එක Extract කරන්න

`NexaAI` folder එක extract කරලා terminal එකෙන් ඒ folder එක open කරන්න.

```bash
cd NexaAI
npm install
npx expo install
npx expo-doctor
```

Error එකක් තිබුණොත්:

```bash
npx expo install --fix
npx expo-doctor
```

## 3. Backend එක install කරන්න

```bash
cd backend
npm install
```

`.env.example` copy කරලා `.env` කියලා rename කරන්න.

එතකොට:

```env
PORT=3000
GEMINI_API_KEY=ඔයාගේ_GEMINI_KEY
GEMINI_MODEL=gemini-2.5-flash-lite
```

Gemini key එක backend එකේ පමණක් තබන්න. Mobile app එකට API key එක දාන්න එපා.

## 4. Backend run කරන්න

`backend` folder එකේ:

```bash
npm start
```

Browser එකෙන්:

```text
http://localhost:3000/health
```

open කරලා `status: ok` වගේ response එකක් බලන්න.

## 5. Phone එකට backend connect කරන්න

Phone එකෙන් `localhost` කියන්නේ phone එකමයි. ඒ නිසා PC එකේ LAN IPv4 address එක භාවිතා කරන්න.

Windows CMD:

```bash
ipconfig
```

Wi-Fi adapter එකේ IPv4 Address එක හොයාගන්න. උදාහරණයක්:

```text
192.168.1.25
```

Project root එකේ `.env` file එක:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.25:3000
```

ඔයාගේ actual IP එක දාන්න.

ඊට පස්සේ:

```bash
npx expo start -c
```

## 6. Android එකෙන් run කරන්න

Project root එකේ:

```bash
npx expo start
```

Terminal/Browser එකේ QR code එක එයි.

Android phone එකේ Expo Go open කරලා QR code scan කරන්න.

LAN වැඩ නොකරනවා නම්:

```bash
npx expo start --tunnel
```

## 7. AI test කරන්න

Chat screen එකට ගිහින්:

```text
Explain machine learning in simple terms.
```

වගේ message එකක් send කරන්න.

Backend + Gemini හරියට configure නම් live Gemini response එක එයි.

Backend unavailable නම් app එක offline demo response එකක් දෙයි.

## 8. Notification test

Settings screen එකට ගිහින්:

**Test Notification (5s)**

button එක ඔබන්න.

Permission request එකක් ආවොත් Allow කරන්න.

තත්පර 5කට පමණ පස්සේ Android notification එක පෙන්විය යුතුයි.

## 9. Student details

`data/profile.js` file එකේ:

```text
[ENTER FULL NAME]
[ENTER STUDENT ID]
[ENTER UNIVERSITY NAME]
[ENTER MODULE NAME]
```

ඔයාගේ actual details දාන්න.

## 10. GitHub upload

```bash
git init
git branch -M main
git add .
git commit -m "Initial NexaAI university assignment"
git remote add origin https://github.com/YOUR_USERNAME/NexaAI.git
git push -u origin main
```

`.env` සහ `node_modules` upload කරන්න එපා.

## 11. Demo video එකේ පෙන්වන්න

1. Home screen
2. Quick prompts
3. New Chat
4. User message
5. Loading indicator
6. AI response
7. New conversation
8. History
9. Delete conversation
10. Settings
11. AppState
12. App background → foreground
13. Notification test
14. Android notification
15. AsyncStorage persistence
16. GitHub repository

## 12. වැදගත්

Expo Go එකේ local notifications test කරන්න පුළුවන්. Remote push notifications Android Expo Go වල current SDK versions සඳහා development build අවශ්‍ය විය හැක. මේ assignment එකේ local scheduled notification demonstration එක භාවිතා කරලා තියෙනවා.

Official Expo documentation අනුව SDK 58 React Native 0.88 සහ Node.js 22.13.x minimum target කරයි.
