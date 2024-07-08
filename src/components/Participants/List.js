import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ParticipantsList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/participants/')
      .then(response => {
        setParticipants(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the participants!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Participants</h1>
      <Link to="/participants/create" className="btn btn-primary mb-2">Create Participant</Link>
      <ul className="list-group">
        {participants.map(participant => (
          <li key={participant.id} className="list-group-item">
            <Link to={`/participants/${participant.id}`}>{participant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantsList;
