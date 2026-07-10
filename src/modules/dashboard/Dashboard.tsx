import React from 'react';
import '../../styles/modules/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Media</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="dashboard-card">
          <h3>Active Bookings</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending PO</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">₹0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
