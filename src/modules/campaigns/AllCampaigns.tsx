import React, { useState } from 'react';
import { FiEdit2, FiEye, FiSearch } from 'react-icons/fi';
import '../../styles/modules/campaigns.css';

interface Campaign {
  id: number;
  bookingId: string;
  client: string;
  displayName: string;
  poNumber: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
  amount: number;
}

const AllCampaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      bookingId: 'Booking 0001',
      client: 'Coca Cola',
      displayName: 'Summer Campaign',
      poNumber: 'PO/2024/001',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      duration: 92,
      status: 'Active',
      amount: 500000
    },
    {
      id: 2,
      bookingId: 'Booking 0002',
      client: 'Nike',
      displayName: 'Launch Campaign',
      poNumber: 'PO/2024/002',
      startDate: '2024-07-15',
      endDate: '2024-09-15',
      duration: 62,
      status: 'Pending',
      amount: 750000
    }
  ]);

  const filteredCampaigns = campaigns.filter(camp =>
    (camp.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === '' || camp.status === filterStatus)
  );

  const handleView = (id: number) => {
    alert(`Viewing campaign ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    alert(`Editing campaign ID: ${id}`);
  };

  return (
    <div className="all-campaigns-container">
      <h3>All Campaigns</h3>

      <div className="filter-section">
        <div className="search-box">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search by Client, Campaign Name, or Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table className="campaigns-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Booking ID</th>
            <th>Client</th>
            <th>Campaign Name</th>
            <th>PO Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.map((camp, index) => (
            <tr key={camp.id}>
              <td>{index + 1}</td>
              <td>{camp.bookingId}</td>
              <td>{camp.client}</td>
              <td>{camp.displayName}</td>
              <td>{camp.poNumber}</td>
              <td>{camp.startDate}</td>
              <td>{camp.endDate}</td>
              <td>{camp.duration} days</td>
              <td className={`status ${camp.status.toLowerCase()}`}>
                {camp.status}
              </td>
              <td>₹{camp.amount.toLocaleString()}</td>
              <td className="action-buttons">
                <button onClick={() => handleView(camp.id)} title="View">
                  <FiEye size={16} />
                </button>
                <button onClick={() => handleEdit(camp.id)} title="Edit">
                  <FiEdit2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCampaigns;
