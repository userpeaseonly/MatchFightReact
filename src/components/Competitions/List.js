import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CompetitionsList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/competitions/')
      .then(response => {
        setCompetitions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competitions!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Competitions</h1>
      <Link to="/competitions/create" className="btn btn-primary mb-2">Create Competition</Link>
      <ul className="list-group">
        {competitions.map(competition => (
          <li key={competition.id} className="list-group-item">
            <Link to={`/competitions/${competition.id}`}>{competition.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompetitionsList;
