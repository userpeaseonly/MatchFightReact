import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CompetitionDetail() {
  const { id } = useParams();
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/competitions/${id}/`)
      .then(response => {
        setCompetition(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the competition!', error);
      });
  }, [id]);

  if (!competition) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{competition.name}</h1>
      <p><strong>Start Date:</strong> {competition.start_date}</p>
      <p><strong>Location:</strong> {competition.location}</p>
    </div>
  );
}

export default CompetitionDetail;
