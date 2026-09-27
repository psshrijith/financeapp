# 🟢 Finance Pro

A modern, ultra-fast mobile personal finance assistant built with **React Native**, **Expo Router**, **NativeWind (Tailwind CSS)**, and **TypeScript**.

---

## ✨ Key Features

- 📅 **Real-Time Monthly Dashboard**: Tracks net balance, monthly income, expenses, savings rate, and recent transactions.
- 📊 **Multi-Year Analytics**: Filter expenses by month & year with category spending percentage breakdowns.
- 👑 **Annual Insights**: Top expense category highlights and horizontal progress bar graphs.
- 📂 **Backup Restoration**: Import Android SQLite & JSON backup files via `expo-document-picker`.
- 🏷️ **Custom Categories**: Add or remove custom expense categories with custom emojis.
- 💎 **Net Worth Tracking**: Monitor liquid cash, fixed deposits, mutual funds, and emergency reserves.
- 🎨 **Modern Mobile UI**: Emerald Green theme (`#10B981`), floating rounded bottom bar, and smooth modal transitions.

---

## 🛠️ Tech Stack

- **Framework**: Expo (SDK 57) / React Native
- **Routing**: Expo Router (`src/app/`)
- **Styling**: NativeWind v4 (Tailwind CSS)
- **Language**: TypeScript (`strict: true`)
- **Testing**: Jest (`npx jest`)
- **CI/CD**: GitHub Actions (4-stage pipeline)

---

## ⚡ Quick Commands

```bash
# Start development server
npx expo start

# Typecheck TypeScript
npx tsc --noEmit

# Run Unit Tests
npm test

# Run Lint Check
npm run lint
```

---

## 📱 EAS Cloud Build Commands

```bash
# Build Android Preview APK (Direct Install on Phone)
npx eas-cli@latest build --platform android --profile preview

# Build Android Production Bundle (.aab for Google Play)
npx eas-cli@latest build --platform android --profile production

# Build iOS App
npx eas-cli@latest build --platform ios --profile production
```

---

## ⚙️ GitHub Actions CI Pipeline Order

The repository executes 4 sequential stages on every push / pull request:

1. `1. Linting` (`npx expo lint`)
2. `2. Typecheck` (`npx tsc --noEmit`)
3. `3. Unit Tests` (`npm test`)
4. `4. Production Build` (`npx expo export --platform android`)

---

## 📄 License

MIT
