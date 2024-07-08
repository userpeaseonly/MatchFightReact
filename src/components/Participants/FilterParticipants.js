import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterParticipants() {
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/competitions/')
      .then(response => {
        setCompetitions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competitions!', error);
      });

    axios.get('http://localhost:8000/api/tournaments/')
      .then(response => {
        setTournaments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tournaments!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/filter-participants/', { 
      competition_id: competitionId, 
      tournament_id: tournamentId 
    })
      .then(response => {
        setParticipants(response.data);
      })
      .catch(error => {
        console.error('There was an error filtering participants!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Filter Participants</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Competition:</label>
          <select className="form-select" value={competitionId} onChange={(e) => setCompetitionId(e.target.value)} required>
            <option value="">Select Competition</option>
            {competitions.map(competition => (
              <option key={competition.id} value={competition.id}>{competition.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tournament:</label>
          <select className="form-select" value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} required>
            <option value="">Select Tournament</option>
            {tournaments.map(tournament => (
              <option key={tournament.id} value={tournament.id}>{`${tournament.gender === 1 ? 'Male' : 'Female'} ${tournament.min_age}-${tournament.max_age} years ${tournament.min_weight}-${tournament.max_weight} kg`}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Filter</button>
      </form>
      {participants.length > 0 && (
        <div className="mt-4">
          <h2>Filtered Participants</h2>
          <ul className="list-group">
            {participants.map(participant => (
              <li key={participant.id} className="list-group-item">
                <p><strong>{participant.name}</strong></p>
                <p>Gender: {participant.gender === 1 ? 'Male' : 'Female'}</p>
                <p>Age: {participant.age}</p>
                <p>Weight: {participant.weight}</p>
                <p>Competition: {participant.competition.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterParticipants;
