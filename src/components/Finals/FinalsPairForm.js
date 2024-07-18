import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FinalsPairForm() {
  const [participant1Id, setParticipant1Id] = useState('');
  const [participant2Id, setParticipant2Id] = useState('');
  const [stage, setStage] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [winnerId, setWinnerId] = useState('');
  const [finalsParticipants, setFinalsParticipants] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/finals-participants/')
      .then(response => setFinalsParticipants(response.data))
      .catch(error => console.error('Error fetching finals participants:', error));

    axios.get('http://localhost:8000/api/competitions/')
      .then(response => setCompetitions(response.data))
      .catch(error => console.error('Error fetching competitions:', error));

    axios.get('http://localhost:8000/api/tournaments/')
      .then(response => setTournaments(response.data))
      .catch(error => console.error('Error fetching tournaments:', error));

    if (id) {
      axios.get(`http://localhost:8000/api/finals-pairs/${id}/`)
        .then(response => {
          const data = response.data;
          setParticipant1Id(data.participant1.id);
          setParticipant2Id(data.participant2 ? data.participant2.id : '');
          setStage(data.stage);
          setCompetitionId(data.competition.id);
          setTournamentId(data.tournament.id);
          setWinnerId(data.winner ? data.winner.id : '');
        })
        .catch(error => console.error('Error fetching finals pair details:', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      participant1: participant1Id,
      participant2: participant2Id || null,
      stage,
      competition: competitionId,
      tournament: tournamentId,
      winner: winnerId || null,
    };

    if (id) {
      axios.put(`http://localhost:8000/api/finals-pairs/${id}/`, data)
        .then(() => navigate('/finals-pairs'))
        .catch(error => console.error('Error updating finals pair:', error));
    } else {
      axios.post('http://localhost:8000/api/finals-pairs/', data)
        .then(() => navigate('/finals-pairs'))
        .catch(error => console.error('Error creating finals pair:', error));
    }
  };

  const getParticipantName = (participantId) => {
    const participant = finalsParticipants.find(p => p.id === participantId);
    return participant ? participant.participant.name : '';
  };

  return (
    <div className="container mt-4">
      <h1>{id ? 'Edit Finals Pair' : 'Create Finals Pair'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Participant 1:</label>
          <select className="form-select" value={participant1Id} onChange={(e) => setParticipant1Id(e.target.value)} required>
            <option value="">Select Participant 1</option>
            {finalsParticipants.map(participant => (
              <option key={participant.id} value={participant.id}>{participant.participant.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Participant 2:</label>
          <select className="form-select" value={participant2Id} onChange={(e) => setParticipant2Id(e.target.value)}>
            <option value="">Select Participant 2 (optional)</option>
            {finalsParticipants.map(participant => (
              <option key={participant.id} value={participant.id}>{participant.participant.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Stage:</label>
          <select className="form-select" value={stage} onChange={(e) => setStage(e.target.value)} required>
            <option value="">Select Stage</option>
            <option value="quarter-final">Quarter-Final</option>
            <option value="half-final">Half-Final</option>
            <option value="final">Final</option>
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
          <label className="form-label">Tournament:</label>
          <select className="form-select" value={tournamentId} onChange={(e) => setTournamentId(e.target.value)} required>
            <option value="">Select Tournament</option>
            {tournaments.map(tournament => (
              <option key={tournament.id} value={tournament.id}>{`${tournament.gender === 1 ? 'Male' : 'Female'} ${tournament.min_age}-${tournament.max_age} years ${tournament.min_weight}-${tournament.max_weight} kg`}</option>
            ))}
          </select>
        </div>
        {participant1Id && (
          <div className="mb-3">
            <label className="form-label">Winner:</label>
            <select className="form-select" value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
              <option value="">Select Winner</option>
              <option value={participant1Id}>{getParticipantName(participant1Id)}</option>
              {participant2Id && <option value={participant2Id}>{getParticipantName(participant2Id)}</option>}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default FinalsPairForm;
