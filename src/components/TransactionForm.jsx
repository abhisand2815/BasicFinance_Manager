import React, { useState } from 'react';

const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Housing',
  'Transportation',
  'Vehicle',
  'Life & Entertainment',
  'Financial',
  'Income',
  'Other'
];

const TransactionForm = ({ onAddTransaction }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food & Dining');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAddTransaction({
      id: crypto.randomUUID(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString()
    });

    setTitle('');
    setAmount('');
  };

  return (
    <div className="glass-panel form-container animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="form-title">Add Transaction</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn income ${type === 'income' ? 'active' : ''}`}
            onClick={() => { setType('income'); setCategory('Income'); }}
          >
            Income
          </button>
          <button
            type="button"
            className={`type-btn expense ${type === 'expense' ? 'active' : ''}`}
            onClick={() => { setType('expense'); setCategory('Food & Dining'); }}
          >
            Expense
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c} style={{ color: '#000' }}>{c}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
