import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PairParticipants() {
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

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
    axios.post('http://localhost:8000/api/pair-participants/', { 
      competition_id: competitionId, 
      tournament_id: tournamentId 
    })
      .then(() => {
        navigate('/pairs');
      })
      .catch(error => {
        console.error('There was an error pairing participants!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Pair Participants</h1>
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
        <button type="submit" className="btn btn-primary">Pair Participants</button>
      </form>
    </div>
  );
}

export default PairParticipants;
