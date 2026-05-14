import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, Calendar, ArrowRight } from 'lucide-react';

const HistoryList = ({ history }) => {
  const [expandedId, setExpandedId] = useState(null);

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel history-container animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="transactions-header">
        <h2 className="transactions-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={20} />
          History & Archives
        </h2>
      </div>

      <div className="history-list">
        {history.map((session) => (
          <div key={session.id} className="history-card">
            <div className="history-item-header" onClick={() => toggleExpand(session.id)}>
              <div className="history-item-info">
                <div className="history-item-date">
                  <Calendar size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle', opacity: 0.7 }} />
                  {formatDate(session.date)}
                </div>
                <div className="history-item-stats">
                  <span>Income: <span style={{ color: 'var(--success)' }}>{formatCurrency(session.income)}</span></span>
                  <span>Expenses: <span style={{ color: 'var(--danger)' }}>{formatCurrency(session.expense)}</span></span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="history-item-balance">
                  {formatCurrency(session.balance)}
                </div>
                {expandedId === session.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedId === session.id && (
              <div className="history-details">
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', margin: '0.75rem 0 0.5rem' }}>
                  ARCHIVED TRANSACTIONS
                </div>
                {session.transactions.map((t) => (
                  <div key={t.id} className="history-transaction-mini">
                    <span>{t.title}</span>
                    <span style={{ color: t.type === 'income' ? 'var(--success)' : 'inherit', fontWeight: 500 }}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
