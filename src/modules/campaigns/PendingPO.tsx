import React, { useState } from 'react';
import { FiEdit2, FiEye, FiSearch, FiCheck } from 'react-icons/fi';
import '../../styles/modules/campaigns.css';

interface PO {
  id: number;
  bookingId: string;
  client: string;
  poNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  approvedAmount: number;
}

const PendingPO: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [poList] = useState<PO[]>([
    {
      id: 1,
      bookingId: 'Booking 0001',
      client: 'Coca Cola',
      poNumber: 'PO/2024/001',
      amount: 500000,
      issueDate: '2024-06-01',
      dueDate: '2024-06-15',
      status: 'Pending',
      approvedAmount: 0
    },
    {
      id: 2,
      bookingId: 'Booking 0002',
      client: 'Nike',
      poNumber: 'PO/2024/002',
      amount: 750000,
      issueDate: '2024-07-15',
      dueDate: '2024-07-30',
      status: 'Pending',
      approvedAmount: 0
    }
  ]);

  const [selectedPOs, setSelectedPOs] = useState<number[]>([]);

  const filteredPOs = poList.filter(po =>
    po.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPO = (id: number) => {
    setSelectedPOs(prev =>
      prev.includes(id) ? prev.filter(poId => poId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPOs(filteredPOs.map(po => po.id));
    } else {
      setSelectedPOs([]);
    }
  };

  const handleApprove = () => {
    if (selectedPOs.length === 0) {
      alert('Please select POs to approve');
      return;
    }
    alert(`${selectedPOs.length} PO(s) approved successfully!`);
    setSelectedPOs([]);
  };

  const handleReject = () => {
    if (selectedPOs.length === 0) {
      alert('Please select POs to reject');
      return;
    }
    alert(`${selectedPOs.length} PO(s) rejected!`);
    setSelectedPOs([]);
  };

  const totalPendingAmount = filteredPOs
    .filter(po => selectedPOs.includes(po.id))
    .reduce((sum, po) => sum + po.amount, 0);

  return (
    <div className="pending-po-container">
      <h3>Pending PO Approvals</h3>

      <div className="filter-section">
        <div className="search-box">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search by Client, PO Number, or Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="po-actions">
        <button className="btn-primary" onClick={handleApprove} disabled={selectedPOs.length === 0}>
          <FiCheck size={16} /> Approve ({selectedPOs.length})
        </button>
        <button className="btn-danger" onClick={handleReject} disabled={selectedPOs.length === 0}>
          Reject ({selectedPOs.length})
        </button>
        {selectedPOs.length > 0 && (
          <span className="selection-info">
            Amount: ₹{totalPendingAmount.toLocaleString()}
          </span>
        )}
      </div>

      <table className="po-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedPOs.length === filteredPOs.length && filteredPOs.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>SL</th>
            <th>Booking ID</th>
            <th>Client</th>
            <th>PO Number</th>
            <th>Amount</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPOs.map((po, index) => (
            <tr key={po.id} className={selectedPOs.includes(po.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPOs.includes(po.id)}
                  onChange={() => handleSelectPO(po.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{po.bookingId}</td>
              <td>{po.client}</td>
              <td>{po.poNumber}</td>
              <td>₹{po.amount.toLocaleString()}</td>
              <td>{po.issueDate}</td>
              <td>{po.dueDate}</td>
              <td className={`status ${po.status.toLowerCase()}`}>
                {po.status}
              </td>
              <td className="action-buttons">
                <button title="View">
                  <FiEye size={16} />
                </button>
                <button title="Edit">
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

export default PendingPO;
