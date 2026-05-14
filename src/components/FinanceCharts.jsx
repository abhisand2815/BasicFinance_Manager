import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const FinanceCharts = ({ transactions }) => {
  // Prepare data for Expense Pie Chart
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categories = {};
  
  expenseTransactions.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categories).map(cat => ({
    name: cat,
    value: categories[cat]
  })).sort((a, b) => b.value - a.value);

  // Colors for Pie Chart
  const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#6366f1', '#ef4444'];

  // Prepare data for Income vs Expense Bar Chart
  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expenseTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const barData = [
    { name: 'Income', amount: incomeTotal, fill: 'var(--success)' },
    { name: 'Expenses', amount: expenseTotal, fill: 'var(--danger)' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel" style={{ padding: '0.75rem', border: '1px solid var(--surface-border)', fontSize: '0.875rem' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{payload[0].name}</p>
          <p style={{ color: payload[0].payload.fill || 'var(--text-primary)' }}>
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (transactions.length === 0) {
    return (
      <div className="glass-panel charts-container animate-fade-in" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>Add transactions to see visual insights</p>
      </div>
    );
  }

  return (
    <div className="charts-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
      {/* Expense Pie Chart */}
      <div className="glass-panel chart-card">
        <h3 className="chart-title">Expense Distribution</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-legend">
          {pieData.slice(0, 4).map((entry, index) => (
            <div key={entry.name} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="legend-name">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Income vs Expenses Bar Chart */}
      <div className="glass-panel chart-card">
        <h3 className="chart-title">Overall Spending</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
              />
              <YAxis 
                hide={true} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar 
                dataKey="amount" 
                radius={[8, 8, 0, 0]} 
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--success)', fontWeight: 700 }}>{formatCurrency(incomeTotal)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Income</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--danger)', fontWeight: 700 }}>{formatCurrency(expenseTotal)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceCharts;
