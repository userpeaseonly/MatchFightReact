import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCompetition() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/competitions/', { name, start_date: startDate, location })
      .then(() => {
        navigate('/competitions');
      })
      .catch(error => {
        console.error('There was an error creating the competition!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Competition</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date:</label>
          <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateCompetition;
