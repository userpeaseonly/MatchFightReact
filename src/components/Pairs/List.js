import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PairsList() {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pairs/')
      .then(response => {
        setPairs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the pairs!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Pairs</h1>
      <ul className="list-group">
        {pairs.map(pair => (
          <li key={pair.id} className="list-group-item">
            {pair.participant1 && pair.participant2 ? (
              <>
                <p><strong>{pair.participant1.name} ({pair.participant1_weight} kg)</strong> vs <strong>{pair.participant2.name} ({pair.participant2_weight} kg)</strong></p>
                <p>Level: {pair.level}</p>
                <p>Competition: {pair.competition && pair.competition.name}</p>
                <p>Tournament: {pair.tournament && `${pair.tournament.gender === 1 ? 'Male' : 'Female'} ${pair.tournament.min_age}-${pair.tournament.max_age} years ${pair.tournament.min_weight}-${pair.tournament.max_weight} kg`}</p>
              </>
            ) : (
              <p>Incomplete pair information.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PairsList;
