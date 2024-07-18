import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FinalsParticipantsList() {
  const [finalsParticipants, setFinalsParticipants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/finals-participants/')
      .then(response => setFinalsParticipants(response.data))
      .catch(error => console.error('Error fetching finals participants:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/finals-participants/${id}/`)
      .then(() => setFinalsParticipants(finalsParticipants.filter(p => p.id !== id)))
      .catch(error => console.error('Error deleting finals participant:', error));
  };

  return (
    <div className="container mt-4">
      <h1>Finals Participants</h1>
      <Link to="/finals-participants/create" className="btn btn-primary mb-3">Create Finals Participant</Link>
      <ul className="list-group">
        {finalsParticipants.map(participant => (
          <li key={participant.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/finals-participants/${participant.id}`}>{participant.participant.name} - {participant.competition.name} - {participant.tournament.gender}</Link>
            <button onClick={() => handleDelete(participant.id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinalsParticipantsList;
