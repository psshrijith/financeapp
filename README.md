# 🟢 Finance Pro - App Feature Guide

A detailed breakdown of all features, pages, analytics tools, data restoration utilities, and category management capabilities built into **Finance Pro**.

---

## 📱 Detailed App Features

### 1. 📅 Real-Time Monthly Cash Flow Dashboard (`Overview`)
- **Time-Aware Dynamic Greeting**: Header automatically evaluates local device time to display `Good morning 👋`, `Good afternoon 👋`, or `Good evening 👋`.
- **Cumulative Net Balance**: Displays total net balance (total earnings minus total expenses) across all recorded transactions.
- **Current Active Month Breakdown**:
  - **Monthly Income**: Total earnings credited during the active month.
  - **Monthly Expenses**: Total outgoing expenses incurred during the active month.
  - **Monthly Saved Amount**: Net positive savings (`Income - Expenses`).
  - **Savings Rate Percentage**: Automatically calculates savings percentage `(Saved Amount / Income) * 100%`.
- **Active Month Category Spending**: Shows category expense totals and progress bars strictly for the active month (e.g. 🏠 Rent, 🏍️ Bike, 🛒 Groceries).
- **Recent Transactions Timeline**: Real-time list of recent income and expense records sorted by date.

---

### 2. 📊 Multi-Year Expense Analytics (`Expenses`)
- **Period Filter Dropdowns**:
  - **Year Selector**: Filter by `2026`, `2025`, `2024`, `2023`, or `All Years`.
  - **Month Selector**: Filter by `Jan` through `Dec` or `All Months`.
- **Dynamic Timeframe Recalculation**: Automatically recalculates total income, total expenses, transaction counts, and category percentage contributions for any selected timeframe.
- **Top Expense Highlight Card**: Identifies your #1 highest expense category for the selected year (e.g., *"👑 Top Expense: 🏠 Rent accounted for 48% of spending"*).
- **Category Progress Bar Graphs**: Visual horizontal progress bars comparing spending percentages across all categories.

---

### 3. 💎 Net Worth & Asset Tracking (`Net Worth`)
- **Net Worth Summary**: Combines liquid balances, long-term investments, and emergency reserves into a unified net worth figure.
- **Asset Allocation Breakdown**:
  - **Liquid Cash & Bank Accounts**: Everyday spending and operating cash.
  - **Fixed Deposits & Mutual Funds**: Growth investments and long-term funds.
  - **Emergency Reserve**: Allocated liquid reserve funds.

---

### 4. 🏷️ Category Management (`More` ➔ `Manage Categories`)
- **14 Pre-Loaded Restored Categories**: Includes `Food`, `Bills`, `Vegetables`, `Groceries`, `Purchases`, `Bike`, `Rent`, `Fruits`, `Transport`, `Travels`, `Savings`, `Sports`, `Hair Treatment`, and `games`.
- **Add Custom Category**: Enter category title and select custom emojis (e.g. 📺 Subscriptions, 🏋️ Gym, ☕ Coffee).
- **Delete Category**: Remove unwanted categories with one tap.
- **App-Wide Sync**: Newly created or deleted categories update across transaction creation forms, category pickers, and expense analytics.

---

### 5. 📂 Backup Data Restoration & Document Import (`More`)
- **2,916 Historical Transactions**: Pre-loaded with restored SQLite backup transactions totaling **₹9,42,518.00** in income and **₹6,62,014.90** in expenses.
- **Device Document Upload**: Built-in file picker (`expo-document-picker`) to import `.json` or `.db` backup files directly from local storage or cloud drives.
- **Demo Data Toggle**: Instantly switch between real restored financial data and sample demo data.

---

### 6. ➕ Add Transaction Modal
- **Quick Entry**: Add new Income or Expense entries with Title, Amount, Category, and Emoji.
- **Floating Action Button**: Non-overlapping elevated Add button resting above the floating bottom navigation bar.

---

### 7. 🎨 Mobile Design System
- **Emerald Green Theme**: Styled with primary accent `#10B981` on dark slate background (`#090D16`).
- **Floating Bottom Bar**: Ultra-rounded navigation bar with tab switching between Overview, Expenses, Net Worth, and More.
