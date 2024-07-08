import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTournament() {
  const [gender, setGender] = useState(1);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/tournaments/', { 
      gender, 
      min_age: minAge, 
      max_age: maxAge, 
      min_weight: minWeight, 
      max_weight: maxWeight 
    })
      .then(() => {
        navigate('/tournaments');
      })
      .catch(error => {
        console.error('There was an error creating the tournament!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Tournament</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select className="form-select" value={gender} onChange={(e) => setGender(Number(e.target.value))}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Min Age:</label>
          <input type="number" className="form-control" value={minAge} onChange={(e) => setMinAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Age:</label>
          <input type="number" className="form-control" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Min Weight:</label>
          <input type="number" step="0.01" className="form-control" value={minWeight} onChange={(e) => setMinWeight(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Weight:</label>
          <input type="number" step="0.01" className="form-control" value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateTournament;
