import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FinalsParticipantForm() {
  const [participantId, setParticipantId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [place, setPlace] = useState('');
  const [participants, setParticipants] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/participants/')
      .then(response => setParticipants(response.data))
      .catch(error => console.error('Error fetching participants:', error));

    axios.get('http://localhost:8000/api/tournaments/')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error fetching tournaments:', error));

    axios.get('http://localhost:8000/api/competitions/')
      .then(response => setCompetitions(response.data))
      .catch(error => console.error('Error fetching competitions:', error));

    if (id) {
      axios.get(`http://localhost:8000/api/finals-participants/${id}/`)
        .then(response => {
          const data = response.data;
          setParticipantId(data.participant);
          setTournamentId(data.tournament);
          setCompetitionId(data.competition);
          setPlace(data.place);
        })
        .catch(error => console.error('Error fetching finals participant details:', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      participant: participantId,
      tournament: tournamentId,
      competition: competitionId,
      place: place || null,
    };

    if (id) {
      axios.put(`http://localhost:8000/api/finals-participants/${id}/`, data)
        .then(() => navigate('/finals-participants'))
        .catch(error => console.error('Error updating finals participant:', error));
    } else {
      axios.post('http://localhost:8000/api/finals-participants/', data)
        .then(() => navigate('/finals-participants'))
        .catch(error => console.error('Error creating finals participant:', error));
    }
  };

  return (
    <div className="container mt-4">
      <h1>{id ? 'Edit Finals Participant' : 'Create Finals Participant'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Participant:</label>
          <select className="form-select" value={participantId} onChange={(e) => setParticipantId(e.target.value)} required>
            <option value="">Select Participant</option>
            {participants.map(participant => (
              <option key={participant.id} value={participant.id}>{participant.name}</option>
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
          <label className="form-label">Competition:</label>
          <select className="form-select" value={competitionId} onChange={(e) => setCompetitionId(e.target.value)} required>
            <option value="">Select Competition</option>
            {competitions.map(competition => (
              <option key={competition.id} value={competition.id}>{competition.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Place:</label>
          <input type="number" className="form-control" value={place} onChange={(e) => setPlace(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default FinalsParticipantForm;
