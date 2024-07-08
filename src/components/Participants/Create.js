import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateParticipant() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(1);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/competitions/')
      .then(response => {
        setCompetitions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competitions!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/participants/', { 
      name, 
      gender, 
      age, 
      weight, 
      competition: competitionId 
    })
      .then(() => {
        navigate('/participants');
      })
      .catch(error => {
        console.error('There was an error creating the participant!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Participant</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select className="form-select" value={gender} onChange={(e) => setGender(Number(e.target.value))}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Weight:</label>
          <input type="number" step="0.01" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Competition:</label>
          <select className="form-select" value={competitionId} onChange={(e) => setCompetitionId(e.target.value)} required>
            <option value="">Select Competition</option>
            {competitions.map(competition => (
              <option key={competition.id} value={competition.id}>{competition.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}

export default CreateParticipant;
