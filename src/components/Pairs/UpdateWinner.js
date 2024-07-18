import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateWinner() {
  const [pairId, setPairId] = useState('');
  const [winnerId, setWinnerId] = useState('');
  const [pairs, setPairs] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/pairs/')
      .then(response => {
        setPairs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the pairs!', error);
      });
  }, []);

  const handlePairChange = (event) => {
    const pairId = event.target.value;
    setPairId(pairId);
    const selectedPair = pairs.find(pair => pair.id === parseInt(pairId));
    if (selectedPair) {
      const participantsArray = [];
      if (selectedPair.participant1) participantsArray.push({ id: selectedPair.participant1.id, name: selectedPair.participant1.name });
      if (selectedPair.participant2) participantsArray.push({ id: selectedPair.participant2.id, name: selectedPair.participant2.name });
      setParticipants(participantsArray);
    } else {
      setParticipants([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/update-winner/', { 
      pair_id: pairId, 
      winner_id: winnerId 
    })
      .then(() => {
        setMessage('Winner updated successfully!');
        setTimeout(() => setMessage(''), 3000);  // Clear the message after 3 seconds
      })
      .catch(error => {
        setMessage('There was an error updating the winner!');
        console.error('There was an error updating the winner!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Update Winner</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pair:</label>
          <select className="form-select" value={pairId} onChange={handlePairChange} required>
            <option value="">Select Pair</option>
            {pairs.map(pair => (
              <option key={pair.id} value={pair.id}>
                {pair.participant1 && pair.participant2 ? `${pair.participant1.name} vs ${pair.participant2.name} - level ${pair.level}` : 'Incomplete pair information'}
                {pair.winner === pair.participant1.id ? ` - Winner: ${pair.participant1.name}` : pair.winner === pair.participant2.id ? ` - Winner: ${pair.participant2.name}` : ' - Winner: None'}
              </option>
            ))}
          </select>
        </div>
        {participants.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Winner:</label>
            <select className="form-select" value={winnerId} onChange={(e) => setWinnerId(e.target.value)} required>
              <option value="">Select Winner</option>
              {participants.map(participant => (
                <option key={participant.id} value={participant.id}>{participant.name}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Update Winner</button>
      </form>
    </div>
  );
}

export default UpdateWinner;
