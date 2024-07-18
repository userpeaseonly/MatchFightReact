import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FinalsPairsList() {
  const [finalsPairs, setFinalsPairs] = useState([]);
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/competitions/')
      .then(response => setCompetitions(response.data))
      .catch(error => console.error('Error fetching competitions:', error));

    axios.get('http://localhost:8000/api/tournaments/')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error fetching tournaments:', error));
  }, []);

  const handleFilter = () => {
    axios.get(`http://localhost:8000/api/finals-pairs/?competition=${competitionId}&tournament=${tournamentId}`)
      .then(response => setFinalsPairs(response.data))
      .catch(error => console.error('Error fetching finals pairs:', error));
  };

  return (
    <div className="container mt-4">
      <h1>Finals Pairs</h1>
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
      <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
      <Link to="/finals-pairs/create" className="btn btn-primary ms-3">Create Finals Pair</Link>
      <ul className="list-group mt-3">
        {finalsPairs.map(pair => (
          <li key={pair.id} className="list-group-item">
            <Link to={`/finals-pairs/${pair.id}`}>
              {pair.participant1.participant.name} vs {pair.participant2 ? pair.participant2.participant.name : 'No Opponent'} - Stage: {pair.stage}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinalsPairsList;
