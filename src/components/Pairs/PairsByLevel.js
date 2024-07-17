import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PairsByLevel() {
  const [level, setLevel] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:8000/api/pairs-by-level/', { 
  //     competition: competitionId, 
  //     tournament: tournamentId, 
  //     level: level 
  //   })
  //     .then(response => {
  //       setPairs(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching pairs by level!', error);
  //     });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/pairs-by-level/', { 
      competition_id: competitionId, 
      tournament_id: tournamentId, 
      level: level 
    })
      .then(response => {
        setPairs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching pairs by level!', error);
      });
};

  return (
    <div className="container mt-4">
      <h1>Pairs by Level</h1>
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
        <div className="mb-3">
          <label className="form-label">Level:</label>
          <input type="number" className="form-control" value={level} onChange={(e) => setLevel(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Get Pairs</button>
      </form>
      {pairs.length > 0 && (
        <div className="mt-4">
          <h2>Pairs at Level {level}</h2>
          <ul className="list-group">
            {pairs.map(pair => (
              <li key={pair.id} className="list-group-item">
                {pair.participant1 && pair.participant2 ? (
                  <>
                    <p><strong>{pair.participant1_name} ({pair.participant1_weight} kg)</strong> vs <strong>{pair.participant2_name} ({pair.participant2_weight} kg)</strong></p>
                    <p>Level: {pair.level}</p>
                    <p>Competition: {pair.competition}</p>
                    <p>Tournament: {pair.tournament}</p>
                    {pair.winner ? (
                      pair.winner === pair.participant1 ? (
                        <p>Winner: {pair.participant1_name}</p>
                      ) : (
                        <p>Winner: {pair.participant2_name}</p>
                      )
                    ) : (
                      <p>Winner: Undefined</p>
                    )}
                  </>
                ) : (
                  <>
                  <p><strong>{pair.participant1_name} ({pair.participant1_weight} kg)</strong></p>
                  <p>Level: {pair.level}</p>
                  <p>Competition: {pair.competition}</p>
                  <p>Tournament: {pair.tournament}</p>
                </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PairsByLevel;
