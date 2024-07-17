import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PairParticipants() {
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [pairs, setPairs] = useState([]);

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
      .then(response => {
        if (response.data.message) {
          setResponseMessage(response.data.message);
          setPairs([]);
        } else {
          setResponseMessage('');
          setPairs(response.data);
        }
      })
      .catch(error => {
        console.error('There was an error pairing participants!', error);
        setResponseMessage('There was an error pairing participants.');
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

      {responseMessage && (
        <div className="alert alert-info mt-4" role="alert">
          {responseMessage}
        </div>
      )}

      {pairs.length > 0 && (
        <div className="mt-4">
          <h2>Pairs</h2>
          <ul className="list-group">
            {pairs.map(pair => (
              <li key={pair.id} className="list-group-item">
                <p><strong>{pair.participant1_name} ({pair.participant1_weight} kg)</strong> vs <strong>{pair.participant2_name ? `${pair.participant2_name} (${pair.participant2_weight} kg)` : 'No opponent'}</strong></p>
                <p>Level: {pair.level}</p>
                <p>Competition: {pair.competition}</p>
                <p>Tournament: {`${pair.tournament}`}</p>
                {pair.winner ? (
                  pair.winner === pair.participant1 ? (
                    <p>Winner: {pair.participant1_name}</p>
                  ) : (
                    <p>Winner: {pair.participant2_name}</p>
                  )
                ) : (
                  <p>Winner: Undefined</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PairParticipants;
