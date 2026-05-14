import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const SummaryCards = ({ balance, income, expense }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary-container animate-fade-in">
      <div className="balance-card">
        <div className="balance-title">Total Balance</div>
        <div className="balance-amount">{formatCurrency(balance)}</div>
      </div>
      
      <div className="stats-row">
        <div className="stat-card glass-panel">
          <div className="stat-icon income">
            <ArrowDownRight size={24} />
          </div>
          <div className="stat-title">Total Income</div>
          <div className="stat-amount" style={{ color: 'var(--success)' }}>
            {formatCurrency(income)}
          </div>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-icon expense">
            <ArrowUpRight size={24} />
          </div>
          <div className="stat-title">Total Expenses</div>
          <div className="stat-amount" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(expense)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
