# 🟢 Finance Pro - Premium Mobile Personal Finance Assistant

**Finance Pro** is a modern, privacy-first mobile application built with **React Native**, **Expo Router**, **NativeWind (Tailwind CSS)**, and **TypeScript**. It helps users track daily transactions, analyze multi-year spending patterns, manage net worth assets, restore historical backup data, and customize category structures.

![Finance Pro App Icon](./assets/images/finance-pro-icon.jpg)

---

## 📱 Building the Android APK

### 1. Cloud Build via EAS (Recommended)
Building in the cloud with EAS generates an installable `.apk` link without requiring Android Studio:

```bash
npx eas-cli build --platform android --profile preview
```
*Once complete, EAS will generate a download URL and QR code to install the APK directly on your Android device.*

### 2. Local APK Build (Requires Android SDK)
```bash
# Using EAS CLI locally:
npx eas-cli build --platform android --profile preview --local

# Or building directly via Expo CLI:
npx expo run:android --variant release
```

---

## 💡 Detailed Overview: What Exactly Does This App Do?

Finance Pro acts as your complete personal finance engine, combining real-time monthly cash flow tracking with multi-year analytical capabilities and automated data import from historical Android SQLite backup files.

### 1. 📅 Real-Time Monthly Cash Flow Dashboard
- **Cumulative Net Balance**: Displays your real-time total net cash balance (cumulative income minus cumulative expenses across all recorded transactions).
- **Current Month Performance**: Automatically isolates the active month (e.g., September 2026) to calculate:
  - **Monthly Income**: Total earnings credited during the current month.
  - **Monthly Expenses**: Total outgoing expenses incurred during the current month.
  - **Monthly Saved Amount**: Net positive savings (`Income - Expenses`).
  - **Savings Rate Percentage**: `(Saved Amount / Income) * 100%`.
- **Monthly Category Spending**: Displays a breakdown of category expenses filtered strictly for the active month (e.g. 🏠 Rent: ₹9,370, 🏍️ Bike: ₹4,216).
- **Recent Transactions Timeline**: Lists recent transactions sorted by date descending with visual type indicators (income vs expense badge).

### 2. 📊 Multi-Year Expense Analytics & Period Calculations
- **Year Filter**: Filter expenses by `2026`, `2025`, `2024`, `2023`, or `All Years`.
- **Month Filter**: Filter expenses by `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`, or `All Months`.
- **Dynamic Period Calculations**:
  - Instantly sums total expenses and total income for the selected timeframe.
  - Displays total count of recorded transactions in that timeframe.
  - Recalculates category spending totals and category percentage contributions for the selected period.

### 3. 👑 Annual Spending Insights & Modern Bar Graphs
- **Top Expense Highlight Banner**: Identifies your #1 highest expense category for any selected year (e.g., *"👑 Top Expense: 🏠 Rent accounted for 48% of all 2023 spending, totaling ₹316,691"*).
- **Modern Horizontal Progress Bar Graph**: Visualizes top spending categories side-by-side with percentages and styled progress fill bars.

### 4. 📂 Historical Backup Restoration & File Upload
- **SQLite Backup Parsing**: Parses Android SQLite database backups (`contactos` disguise format) and imports 2,916 historical transaction records (totaling **₹9,42,518.00** in income and **₹6,62,014.90** in expenses).
- **Document Picker Upload**: Includes an integrated file picker (`expo-document-picker`) in Settings (`MorePage` -> `Upload Backup File`) allowing users to upload `.json` or `.db` backup files directly from their device downloads or cloud storage.
- **Demo Data Toggle**: Allows instant switching between real restored user data and sample demo data.

### 5. 🏷️ Custom Category Management
- **14 Restored Categories**: Pre-loaded with categories extracted from your backup file (`Food`, `Bills`, `Vegetables`, `Groceries`, `Purchases`, `Bike`, `Rent`, `Fruits`, `Transport`, `Travels`, `Savings`, `Sports`, `Hair Treatment`, `games`).
- **Add Category**: Enter custom category names and pick custom emojis (e.g. 📺 Subscriptions, 🏋️ Gym, ☕ Coffee).
- **Remove Category**: Delete unwanted categories directly from Settings with one tap.
- **App-Wide Propagation**: Custom categories instantly appear in transaction creation forms, category selectors, and expense analytics breakdowns.

### 6. 💎 Net Worth & Asset Tracking
- **Net Worth Overview**: Calculates total net worth by combining liquid cash balances with emergency savings and fixed investments.
- **Assets vs Liabilities**: Separates routine monthly spending from asset classes:
  - **Liquid Cash & Savings**: Bank account balances.
  - **Fixed Deposits & MF**: Mutual funds and long-term investments.
  - **Emergency Reserve**: Allocated liquid reserve funds.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Expo (SDK 57) / React Native | Cross-platform mobile foundation |
| **Routing** | Expo Router | File-based navigation (`src/app/`) |
| **Styling** | NativeWind v4 (Tailwind CSS) | Utility-first responsive styling |
| **Icons** | `@expo/vector-icons` (Ionicons) | Vector UI icons |
| **Type System** | TypeScript (`strict: true`) | Strict compile-time type safety |
| **File Picker** | `expo-document-picker` | Native file picker integration |
| **CI/CD** | GitHub Actions | Automated build, lint & typecheck pipeline |

---

## 🏗️ Codebase Rules & Standards

1. **Strict File Line Limit**: **100% of files in `src/` are kept under 150 lines of code** for maximum modularity and readability.
2. **Unified Theme**: Emerald Green (`#10B981`) primary accent with slate dark background (`bg-slate-950`).
3. **Clean Architecture**: Decoupled state hooks (`useFinanceAppState`), modular UI components (`HomeView`, `ExpenseAnalyticsPage`, `NetWorthPage`, `MorePage`), and helper utilities (`transaction-helper`, `file-importer`).

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/finance-app.git
cd finance-app
npm install
```

### 2. Start Development Server
```bash
npx expo start
```

### 3. Verification & Diagnostic Commands
```bash
# Typecheck TypeScript files (Must pass with 0 errors)
npx tsc --noEmit

# Run Expo lint check
npx expo lint

# Diagnose dependency & configuration issues
npx expo-doctor
```

---

## 📄 License

Licensed under the MIT License.
