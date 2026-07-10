import React, { useState } from 'react';
import '../../styles/modules/campaigns.css';

const NewBooking: React.FC = () => {
  const [bookingType, setBookingType] = useState('Booking');
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    company: '',
    client: '',
    displayName: '',
    poNumber: '',
    startDate: '',
    duration: '',
    endDate: '',
  });

  const [lineItems, setLineItems] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  const handleBookingTypeChange = (type: string) => {
    setBookingType(type);
    if (type === 'Booking') {
      setBookingId('Booking 0001');
    } else {
      setBookingId('FOC 001');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newData = { ...formData, [name]: value };

    if (name === 'startDate' || name === 'duration') {
      const startDate = name === 'startDate' ? new Date(value) : new Date(formData.startDate);
      const days = name === 'duration' ? parseInt(value) : parseInt(formData.duration);
      if (startDate && days) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        newData.endDate = endDate.toISOString().split('T')[0];
      }
    }

    setFormData(newData);
  };

  const handleAddFromMedia = () => {
    alert('Open Media List Dialog');
  };

  const handleAttachPO = () => {
    alert('Open file upload dialog for PO');
  };

  return (
    <div className="new-booking-container">
      <h3>New Booking</h3>

      <div className="booking-header">
        <div className="booking-type-selector">
          <label>
            <input
              type="radio"
              value="Booking"
              checked={bookingType === 'Booking'}
              onChange={(e) => handleBookingTypeChange(e.target.value)}
            />
            Booking
          </label>
          <label>
            <input
              type="radio"
              value="FOC"
              checked={bookingType === 'FOC'}
              onChange={(e) => handleBookingTypeChange(e.target.value)}
            />
            FOC (Free of Cost)
          </label>
        </div>
        {bookingId && <div className="booking-id-display">ID: {bookingId}</div>}
        <button className="btn-action" onClick={handleAddFromMedia}>
          Add from Media
        </button>
      </div>

      <div className="booking-section">
        <h4>Booking Details</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Client</label>
            <input type="text" name="client" value={formData.client} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>PO Number</label>
            <input type="text" name="poNumber" value={formData.poNumber} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Duration (Days)</label>
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" name="endDate" value={formData.endDate} readOnly />
          </div>
        </div>
        <div className="form-row">
          <button className="btn-secondary" onClick={handleAttachPO}>Attach PO</button>
        </div>
      </div>

      <div className="booking-section">
        <h4>Line Items</h4>
        <table className="line-items-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Status</th>
              <th>Media Code</th>
              <th>Location</th>
              <th>Size</th>
              <th>Lit Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>No's</th>
              <th>Rate/MTH</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.length === 0 && (
              <tr><td colSpan={12} className="empty-message">No items added</td></tr>
            )}
            {lineItems.map((item, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td>{item.status}</td>
                <td>{item.mediaCode}</td>
                <td>{item.location}</td>
                <td>{item.size}</td>
                <td>{item.litType}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.duration}</td>
                <td>{item.nos}</td>
                <td>₹{item.rate}</td>
                <td>₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="booking-section">
        <h4>Expenses</h4>
        <table className="expenses-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Location</th>
              <th>Size</th>
              <th>Exp Type</th>
              <th>Exp Date</th>
              <th>Rate Per SQFT</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr><td colSpan={6} className="empty-message">No expenses added</td></tr>
            )}
            {expenses.map((exp, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td>{exp.location}</td>
                <td>{exp.size}</td>
                <td>{exp.expType}</td>
                <td>{exp.expDate}</td>
                <td>₹{exp.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        <button className="btn-primary">Save Booking</button>
        <button className="btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default NewBooking;
