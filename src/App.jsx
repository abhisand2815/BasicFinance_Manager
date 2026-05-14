import React, { useState, useEffect } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import HistoryList from './components/HistoryList';
import FinanceCharts from './components/FinanceCharts';
import { RotateCcw } from 'lucide-react';

// Initial dummy data to make it look good right away
const INITIAL_TRANSACTIONS = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 85000,
    type: 'income',
    category: 'Income',
    date: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    title: 'House Rent',
    amount: 18000,
    type: 'expense',
    category: 'Housing',
    date: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: '3',
    title: 'Dinner at Restaurant',
    amount: 2450,
    type: 'expense',
    category: 'Food & Dining',
    date: new Date().toISOString()
  }
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    // Try to load from local storage
    const saved = localStorage.getItem('dashboard_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('dashboard_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Derived state
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const balance = income - expense;

  // Persist to localStorage when transactions change
  useEffect(() => {
    localStorage.setItem('dashboard_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dashboard_history', JSON.stringify(history));
  }, [history]);

  const handleAddTransaction = (newTransaction) => {
    // Add to beginning of array
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleReset = () => {
    if (transactions.length === 0) return;
    
    const confirmReset = window.confirm("Are you sure you want to reset? All current transactions will be moved to history.");
    
    if (confirmReset) {
      const newHistoryItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        transactions: [...transactions],
        income,
        expense,
        balance
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
      setTransactions([]);
    }
  };

  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <h1 className="header-title">FinanceFlow</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="secondary-btn reset-btn" 
            onClick={handleReset}
            disabled={transactions.length === 0}
            title="Archive current transactions and start fresh"
          >
            <RotateCcw size={16} />
            Reset Dashboard
          </button>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Personal Dashboard
          </div>
        </div>
      </header>
      
      <div className="dashboard-grid">
        {/* Left Column: Summary and Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <SummaryCards balance={balance} income={income} expense={expense} />
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>
        
        {/* Right Column: Charts, Transaction List and History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <FinanceCharts transactions={transactions} />
          <TransactionList transactions={transactions} />
          <HistoryList history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
