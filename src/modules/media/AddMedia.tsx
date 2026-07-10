import React, { useState } from 'react';
import '../../styles/modules/media.css';

const AddMedia: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    mediaCode: '',
    location: '',
    address: '',
    mediaType: '',
    litType: '',
    city: '',
    state: '',
    width: '',
    height: '',
    sqft: '',
    unit: '',
    latitude: '',
    longitude: '',
    mediaFacing: '',
    footfall: '',
    cardRate: '',
    photoUrl: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newData = { ...formData, [name]: value };

    // Auto-calculate SQFT
    if (name === 'width' || name === 'height') {
      const width = name === 'width' ? parseFloat(value) : parseFloat(formData.width);
      const height = name === 'height' ? parseFloat(value) : parseFloat(formData.height);
      if (width && height) {
        newData.sqft = (width * height).toFixed(2);
      }
    }

    setFormData(newData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Media Data:', formData);
    alert('Media saved successfully!');
  };

  return (
    <div className="add-media-form">
      <h3>Add Media</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="form-group">
            <label>Media Code</label>
            <input
              type="text"
              name="mediaCode"
              value={formData.mediaCode}
              onChange={handleChange}
              placeholder="Enter media code"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Media Type</label>
            <select name="mediaType" value={formData.mediaType} onChange={handleChange}>
              <option value="">Select Media Type</option>
              <option value="Billboard">Billboard</option>
              <option value="Transit">Transit</option>
              <option value="Digital">Digital</option>
              <option value="Flex">Flex</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lit Type</label>
            <select name="litType" value={formData.litType} onChange={handleChange}>
              <option value="">Select Lit Type</option>
              <option value="Illuminated">Illuminated</option>
              <option value="Non-Illuminated">Non-Illuminated</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Width</label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              placeholder="Enter width"
            />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter height"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>SQFT (Auto-calculated)</label>
            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              readOnly
              placeholder="Auto-calculated"
            />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <select name="unit" value={formData.unit} onChange={handleChange}>
              <option value="">Select Unit</option>
              <option value="Sqft">Sqft</option>
              <option value="Sqm">Sqm</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Enter latitude"
              step="0.0001"
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Enter longitude"
              step="0.0001"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Media Facing</label>
            <select name="mediaFacing" value={formData.mediaFacing} onChange={handleChange}>
              <option value="">Select Facing</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
          <div className="form-group">
            <label>Footfall</label>
            <input
              type="number"
              name="footfall"
              value={formData.footfall}
              onChange={handleChange}
              placeholder="Enter footfall"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Card Rate</label>
            <input
              type="number"
              name="cardRate"
              value={formData.cardRate}
              onChange={handleChange}
              placeholder="Enter card rate"
            />
          </div>
          <div className="form-group">
            <label>Photo Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {formData.photoUrl && (
          <div className="photo-preview">
            <img src={formData.photoUrl} alt="Media" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Media</button>
          <button type="reset" className="btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  );
};

export default AddMedia;
