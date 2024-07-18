import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TournamentsList() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tournaments/')
      .then(response => {
        setTournaments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tournaments!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Tournaments</h1>
      <Link to="/tournaments/create" className="btn btn-primary mb-2">Create Tournament</Link>
      <ul className="list-group">
        {tournaments.map(tournament => (
          <li key={tournament.id} className="list-group-item">
            <Link to={`/tournaments/${tournament.id}`}>{tournament.id} | {`${tournament.gender === 1 ? 'Male' : 'Female'} ${tournament.min_age}-${tournament.max_age} years ${tournament.min_weight}-${tournament.max_weight} kg`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentsList;
