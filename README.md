# 🟢 Finance Pro - App Feature Guide

A clean breakdown of all core features, analytical tools, category management, and backup import capabilities in **Finance Pro**.

---

## 📱 Core App Features

### 1. 📅 Real-Time Monthly Cash Flow Dashboard (`Overview`)
- **Dynamic Time-Aware Greeting**: Automatically displays `Good morning 👋`, `Good afternoon 👋`, or `Good evening 👋` based on local device time.
- **Net Cash Balance**: Calculates real-time total net balance (total income minus total expenses) across recorded transactions.
- **Active Month Performance**:
  - **Monthly Income**: Earnings credited during the active month.
  - **Monthly Expenses**: Outgoing expenses incurred during the active month.
  - **Monthly Savings**: Net positive savings (`Income - Expenses`).
  - **Savings Rate Percentage**: Automatically calculates active month savings percentage `(Savings / Income) * 100%`.
- **Monthly Category Breakdown**: Displays category spending totals and visual progress bars strictly for the active month.
- **Recent Transactions Timeline**: Real-time list of recent income and expense transactions sorted by date.

---

### 2. 📊 Multi-Year Expense Analytics (`Expenses`)
- **Period Filter Selectors**:
  - **Year Filter**: Select specific years or view `All Years`.
  - **Month Filter**: Select specific months (`Jan` - `Dec`) or view `All Months`.
- **Dynamic Timeframe Calculations**: Instantly recalculates total income, expenses, transaction counts, and category percentage contributions for any selected period.
- **Top Expense Highlight Banner**: Automatically identifies your highest expense category and percentage contribution for the selected period.
- **Category Progress Bar Graphs**: Visual horizontal progress bars comparing spending percentages across all categories.

---

### 3. 💎 Net Worth & Asset Tracking (`Net Worth`)
- **Total Net Worth Summary**: Combines liquid accounts, long-term investments, and reserves into a unified net worth total.
- **Asset Allocation Breakdown**:
  - **Liquid Cash & Savings**: Everyday operating and bank account balances.
  - **Fixed Deposits & Mutual Funds**: Growth investments and long-term funds.
  - **Emergency Reserve**: Allocated reserve funds.

---

### 4. 🏷️ Custom Category Management (`More` ➔ `Manage Categories`)
- **Pre-Loaded Categories**: Default category structures (e.g. `Food`, `Bills`, `Groceries`, `Rent`, `Transport`, `Travels`, `Savings`).
- **Add Custom Category**: Enter category title and pick a custom emoji.
- **Delete Category**: Remove unwanted categories with one tap.
- **App-Wide Propagation**: Custom categories automatically update transaction creation forms, category selectors, and expense analytics breakdowns.

---

### 5. 📂 Backup File Import (`More`)
- **Device Document Import**: Built-in file picker (`expo-document-picker`) to import `.json` or `.db` financial backup files directly from local storage or cloud drives.
- **Demo Data Toggle**: Switch demo mode on/off to preview sample data or test clean app states.

---

### 6. ➕ Add Transaction Modal
- **Quick Record Entry**: Record new Income or Expense entries with Title, Amount, Category, and Emoji.
- **Elevated Action Button**: Non-overlapping floating action button positioned above the navigation bar.

---

### 7. 🎨 Mobile Design System
- **Emerald Green Theme**: Styled with primary accent `#10B981` on dark slate background (`#090D16`).
- **Floating Bottom Bar**: Ultra-rounded navigation bar for seamless tab switching between Overview, Expenses, Net Worth, and More.

---

## 🚀 Running the App Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended) and `npm`
- For physical device testing: **Expo Go** app installed from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
- For emulator/simulator testing: Android Studio (with an Android Virtual Device configured) or Xcode (macOS only)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npx expo start
```
*(or run `npm start`)*

### 3. Open on Your Device or Emulator
Once Metro bundler starts, choose your preferred target:

- **Physical Phone (Expo Go)**:
  - Connect your phone to the same Wi-Fi network as your computer.
  - **Android**: Scan the terminal's QR code within the Expo Go app.
  - **iOS**: Scan the QR code with your default Camera app.
  - *Tip*: If Wi-Fi firewalls block local connections, start with `npx expo start --tunnel`.
- **Android Emulator**: Press <kbd>a</kbd> in the terminal (or run `npx expo start --android`).
- **iOS Simulator** *(macOS only)*: Press <kbd>i</kbd> in the terminal (or run `npx expo start --ios`).
- **Web Browser**: Press <kbd>w</kbd> in the terminal (or run `npx expo start --web`).

### Useful Commands
- **Clear Metro cache**:
  ```bash
  npx expo start -c
  ```
- **Typecheck code**:
  ```bash
  npx tsc --noEmit
  ```

---

## 🤖 Generating the Android App

This project is configured with **EAS (Expo Application Services)** and Expo Continuous Native Generation (CNG). You can generate the Android application via cloud builds (recommended) or locally on your machine.

### Method 1: Cloud Build with EAS (Recommended)

Cloud builds do not require local Android SDK, Java, or Android Studio setup.

1. **Log in to your Expo account**:
   ```bash
   npx eas-cli@latest login
   ```

2. **Generate an Installable APK (for testing or direct sharing)**:
   The `preview` profile in `eas.json` is pre-configured to output a standalone `.apk` file:
   ```bash
   npx eas-cli@latest build --platform android --profile preview
   ```
   Once the cloud build finishes, EAS provides a direct download link and QR code to install the APK on any Android phone.

3. **Generate a Production Android App Bundle (.aab)** *(for Google Play Store)*:
   ```bash
   npx eas-cli@latest build --platform android --profile production
   ```

4. **Generate a Development Build APK** *(includes custom native code & debug tools)*:
   ```bash
   npx eas-cli@latest build --platform android --profile development
   ```

---

### Method 2: Local Android Build

If you have Android Studio, JDK 17+, and the Android SDK configured locally:

#### Option A: Local Build via EAS CLI
Run EAS build on your machine without waiting in the cloud build queue:
```bash
npx eas-cli@latest build --platform android --profile preview --local
```

#### Option B: Generate Native Project and Build with Gradle
You can generate the native `android/` directory using Expo CNG and assemble the APK directly:

1. **Prebuild the native Android project**:
   ```bash
   npx expo prebuild --platform android
   ```

2. **Assemble the release APK with Gradle**:
   ```bash
   cd android && ./gradlew assembleRelease
   ```
   The built APK will be located at:
   ```text
   android/app/build/outputs/apk/release/app-release.apk
   ```

> [!NOTE]
> The `android/` directory is automatically generated by Expo Continuous Native Generation (CNG). Do not manually edit files inside `android/`—native configurations should always be managed through `app.json` and config plugins.
