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
