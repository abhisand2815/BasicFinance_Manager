import React from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Home, 
  Car, 
  Film, 
  CreditCard, 
  DollarSign, 
  HelpCircle 
} from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Food & Dining': return <Coffee size={20} color="#8b5cf6" />;
    case 'Shopping': return <ShoppingBag size={20} color="#ec4899" />;
    case 'Housing': return <Home size={20} color="#3b82f6" />;
    case 'Transportation':
    case 'Vehicle': return <Car size={20} color="#f59e0b" />;
    case 'Life & Entertainment': return <Film size={20} color="#10b981" />;
    case 'Financial': return <CreditCard size={20} color="#6366f1" />;
    case 'Income': return <DollarSign size={20} color="#10b981" />;
    default: return <HelpCircle size={20} color="#9ca3af" />;
  }
};

const TransactionList = ({ transactions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="glass-panel transactions-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="transactions-header">
        <h2 className="transactions-title">Recent Transactions</h2>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <DollarSign size={48} />
          </div>
          <p>No transactions yet.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Add an income or expense to get started.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((t) => (
            <div key={t.id} className="transaction-item">
              <div className="transaction-icon-wrapper">
                {getCategoryIcon(t.category)}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-title">{t.title}</div>
                <div className="transaction-category">{t.category} • {formatDate(t.date)}</div>
              </div>
              
              <div className={`transaction-amount ${t.type}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
