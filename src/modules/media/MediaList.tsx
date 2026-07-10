import React, { useState } from 'react';
import { FiEdit2, FiEye, FiSearch } from 'react-icons/fi';
import '../../styles/modules/media.css';

interface MediaItem {
  id: number;
  mediaCode: string;
  city: string;
  location: string;
  mediaType: string;
  litType: string;
  size: string;
  sqft: number;
  nos: number;
  amount: number;
  availability: string;
}

const MediaList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [mediaList] = useState<MediaItem[]>([
    {
      id: 1,
      mediaCode: 'MED001',
      city: 'Mumbai',
      location: 'Gateway of India',
      mediaType: 'Billboard',
      litType: 'Illuminated',
      size: '14x20',
      sqft: 280,
      nos: 1,
      amount: 50000,
      availability: 'Available'
    },
    {
      id: 2,
      mediaCode: 'MED002',
      city: 'Delhi',
      location: 'Connaught Place',
      mediaType: 'Digital',
      litType: 'Illuminated',
      size: '10x12',
      sqft: 120,
      nos: 1,
      amount: 75000,
      availability: 'Booked'
    }
  ]);

  const filteredMedia = mediaList.filter(item =>
    (item.mediaCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === '' || item.mediaType === filterType)
  );

  const handleView = (id: number) => {
    alert(`Viewing media ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    alert(`Editing media ID: ${id}`);
  };

  return (
    <div className="media-list-container">
      <h3>Media List</h3>
      
      <div className="filter-section">
        <div className="search-box">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search by Media Code or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Billboard">Billboard</option>
          <option value="Digital">Digital</option>
          <option value="Transit">Transit</option>
          <option value="Flex">Flex</option>
        </select>
      </div>

      <table className="media-table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Media Code</th>
            <th>City</th>
            <th>Location</th>
            <th>Media Type</th>
            <th>Lit Type</th>
            <th>Size</th>
            <th>SQFT</th>
            <th>No's</th>
            <th>Amount</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedia.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.mediaCode}</td>
              <td>{item.city}</td>
              <td>{item.location}</td>
              <td>{item.mediaType}</td>
              <td>{item.litType}</td>
              <td>{item.size}</td>
              <td>{item.sqft}</td>
              <td>{item.nos}</td>
              <td>₹{item.amount.toLocaleString()}</td>
              <td className={`availability ${item.availability.toLowerCase()}`}>
                {item.availability}
              </td>
              <td className="action-buttons">
                <button onClick={() => handleView(item.id)} title="View">
                  <FiEye size={16} />
                </button>
                <button onClick={() => handleEdit(item.id)} title="Edit">
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

export default MediaList;
