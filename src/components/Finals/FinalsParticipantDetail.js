import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FinalsParticipantDetail() {
  const { id } = useParams();
  const [participant, setParticipant] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/finals-participants/${id}/`)
      .then(response => setParticipant(response.data))
      .catch(error => console.error('Error fetching finals participant details:', error));
  }, [id]);

  if (!participant) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Finals Participant Details</h1>
      <p><strong>Name:</strong> {participant.participant.name}</p>
      <p><strong>Weight:</strong> {participant.participant.weight}</p>
      <p><strong>Age:</strong> {participant.participant.age}</p>
      <p><strong>Unique ID:</strong> {participant.participant.unique_id}</p>
      <p><strong>Competition:</strong> {participant.competition.name}</p>
      <p><strong>Tournament:</strong> {participant.tournament.id} - {participant.tournament.gender} - {participant.tournament.min_age} {participant.tournament.max_age} - {participant.tournament.min_weight} {participant.tournament.min_weight}</p>
      <p><strong>Place:</strong> {participant.place ?? 'Not determined'}</p>
    </div>
  );
}

export default FinalsParticipantDetail;
