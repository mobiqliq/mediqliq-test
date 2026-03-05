import React, { useState } from 'react';

const Patients = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await window.electron.invoke('patient:register', formData);
    
    if (response.success) {
      alert(`Success! UHID: ${response.data.uhid}`);
      setFormData({ first_name: '', last_name: '', phone: '', date_of_birth: '', gender: 'Male' });
    } else {
      alert(`Error: ${response.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">New Patient Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">First Name</label>
            <input type="text" className="border p-2 rounded mt-1" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Last Name</label>
            <input type="text" className="border p-2 rounded mt-1" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
            <input type="text" className="border p-2 rounded mt-1" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
            <input type="date" className="border p-2 rounded mt-1" value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} required />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-semibold text-gray-600">Gender</label>
            <select className="border p-2 rounded mt-1" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-2 mt-4">
            <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-bold py-3 rounded hover:bg-blue-800 transition shadow-lg">
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Patients;
