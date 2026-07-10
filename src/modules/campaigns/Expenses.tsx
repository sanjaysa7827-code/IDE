import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import '../../styles/modules/campaigns.css';

interface Expense {
  id: number;
  bookingId: string;
  location: string;
  expenseType: string;
  amount: number;
  date: string;
  description: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      bookingId: 'Booking 0001',
      location: 'Mumbai - Gateway',
      expenseType: 'Installation',
      amount: 15000,
      date: '2024-06-01',
      description: 'Flex installation charges'
    },
    {
      id: 2,
      bookingId: 'Booking 0001',
      location: 'Mumbai - Gateway',
      expenseType: 'Removal',
      amount: 8000,
      date: '2024-08-31',
      description: 'Flex removal charges'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: '',
    location: '',
    expenseType: 'Installation',
    amount: '',
    date: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExpense = () => {
    if (formData.bookingId && formData.location && formData.amount && formData.date) {
      const newExpense: Expense = {
        id: expenses.length + 1,
        ...formData,
        amount: parseFloat(formData.amount)
      };
      setExpenses([...expenses, newExpense]);
      setFormData({ bookingId: '', location: '', expenseType: 'Installation', amount: '', date: '', description: '' });
      setShowForm(false);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h3>Expenses</h3>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <FiPlus size={16} /> Add Expense
        </button>
      </div>

      {showForm && (
        <div className="expense-form">
          <h4>Add New Expense</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Booking ID *</label>
              <input
                type="text"
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
                placeholder="Enter booking ID"
              />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expense Type</label>
              <select name="expenseType" value={formData.expenseType} onChange={handleChange}>
                <option value="Installation">Installation</option>
                <option value="Removal">Removal</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Transport">Transport</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-primary" onClick={handleAddExpense}>Save Expense</button>
            <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table className="expenses-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Booking ID</th>
            <th>Location</th>
            <th>Expense Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={exp.id}>
              <td>{index + 1}</td>
              <td>{exp.bookingId}</td>
              <td>{exp.location}</td>
              <td>{exp.expenseType}</td>
              <td>₹{exp.amount.toLocaleString()}</td>
              <td>{exp.date}</td>
              <td>{exp.description}</td>
              <td className="action-buttons">
                <button title="Edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(exp.id)} title="Delete">
                  <FiTrash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="expenses-summary">
        <h4>Total Expenses: ₹{totalExpenses.toLocaleString()}</h4>
      </div>
    </div>
  );
};

export default Expenses;
