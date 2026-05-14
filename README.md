# FinanceFlow — Personal Finance Dashboard

A personal finance manager built with React and Vite. Track income and expenses, visualize spending patterns, and archive past sessions in a clean, dark glassmorphic UI.

---

## Features

- **Live Balance Tracking** — Total balance, income, and expenses update instantly as transactions are added.
- **Transaction Logging** — Add income or expenses with a title, amount, and category.
- **Expense Distribution Chart** — Donut chart breaking down spending by category.
- **Income vs. Expenses Chart** — Side-by-side bar comparison of total inflows and outflows.
- **Recent Transactions List** — Each entry displays its category icon, title, date, and color-coded amount.
- **Reset and Archive** — Archives the current session to History and starts a fresh slate. No data is lost.
- **History Viewer** — Expand any archived session to review its full transaction breakdown, income, expenses, and net balance.
- **Persistent Storage** — All data is saved to `localStorage` and survives page refreshes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | CSS (Glassmorphism, CSS Variables) |
| Font | Inter (Google Fonts) |
| Storage | localStorage |

---

## Project Structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── SummaryCards.jsx      # Balance, income & expense cards
│   │   ├── TransactionForm.jsx   # Add transaction form
│   │   ├── TransactionList.jsx   # Recent transactions with icons
│   │   ├── FinanceCharts.jsx     # Pie and bar charts via Recharts
│   │   └── HistoryList.jsx       # Archived session viewer
│   ├── App.jsx                   # Root component and state management
│   ├── main.jsx                  # React entry point
│   ├── App.css                   # Component-level styles
│   └── index.css                 # Global styles and CSS variables
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/your-username/financeflow.git
cd financeflow
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

Output is generated in the `dist/` folder.

---

## Transaction Categories

Food & Dining, Shopping, Housing, Transportation, Vehicle, Life & Entertainment, Financial, Income, Other.

---

## Data Persistence

Two keys are written to `localStorage`:

- `dashboard_transactions` — active transaction list
- `dashboard_history` — archived session records

Clearing browser storage resets the app to its default sample data.

---

## Design

Built around a glassmorphism aesthetic — semi-transparent frosted panels over a deep dark background with purple-to-blue accent gradients. Color tokens are managed via CSS custom properties defined in `index.css`.

---

## License

MIT
