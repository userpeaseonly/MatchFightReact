import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ParticipantDetail() {
  const { id } = useParams();
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/participants/${id}/`)
      .then(response => {
        setParticipant(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the participant!', error);
      });
  }, [id]);

  if (!participant) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{participant.name}</h1>
      <p><strong>Gender:</strong> {participant.gender === 1 ? 'Male' : 'Female'}</p>
      <p><strong>Age:</strong> {participant.age}</p>
      <p><strong>Weight:</strong> {participant.weight}</p>
      <p><strong>Competition:</strong> {participant.competition.name}</p>
    </div>
  );
}

export default ParticipantDetail;
