import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function FinalsPairDetail() {
  const { id } = useParams();
  const [pair, setPair] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/finals-pairs/${id}/`)
      .then(response => setPair(response.data))
      .catch(error => console.error('Error fetching finals pair details:', error));
  }, [id]);

  if (!pair) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Finals Pair Details</h1>
      <p><strong>Participant 1:</strong> {pair.participant1.participant.name}</p>
      <p><strong>Participant 2:</strong> {pair.participant2.participant.name}</p>
      <p><strong>Stage:</strong> {pair.stage}</p>
      <p><strong>Competition:</strong> {pair.competition.name}</p>
      <p><strong>Tournament:</strong> {`${pair.tournament.gender === 1 ? 'Male' : 'Female'} ${pair.tournament.min_age}-${pair.tournament.max_age} years ${pair.tournament.min_weight}-${pair.tournament.max_weight} kg`}</p>
      <p><strong>Winner:</strong> {pair.winner === pair.participant1.id ? ` ${pair.participant1.participant.name}` : pair.winner === pair.participant2.id ? ` ${pair.participant2.participant.name}` : ' None'}</p>
      <Link to={`/finals-pairs/${pair.id}/edit`} className="btn btn-primary">Edit</Link>
    </div>
  );
}

export default FinalsPairDetail;
