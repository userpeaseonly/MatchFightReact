import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/tournaments/${id}/`)
      .then(response => {
        setTournament(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tournament!', error);
      });
  }, [id]);

  if (!tournament) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{`${tournament.gender === 1 ? 'Male' : 'Female'} ${tournament.min_age}-${tournament.max_age} years ${tournament.min_weight}-${tournament.max_weight} kg`}</h1>
      <p><strong>Gender:</strong> {tournament.gender === 1 ? 'Male' : 'Female'}</p>
      <p><strong>Age Range:</strong> {tournament.min_age} - {tournament.max_age} years</p>
      <p><strong>Weight Range:</strong> {tournament.min_weight} - {tournament.max_weight} kg</p>
    </div>
  );
}

export default TournamentDetail;
