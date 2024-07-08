import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompetitionsList from './components/Competitions/List';
import CompetitionDetail from './components/Competitions/Detail';
import CreateCompetition from './components/Competitions/Create';
import TournamentsList from './components/Tournaments/List';
import TournamentDetail from './components/Tournaments/Detail';
import CreateTournament from './components/Tournaments/Create';
import ParticipantsList from './components/Participants/List';
import ParticipantDetail from './components/Participants/Detail';
import CreateParticipant from './components/Participants/Create';
import PairsList from './components/Pairs/List';
import GenerateParticipants from './components/Participants/GenerateParticipants';
import FilterParticipants from './components/Participants/FilterParticipants';
import PairParticipants from './components/Participants/PairParticipants';
import PairsByLevel from './components/Pairs/PairsByLevel';
import UpdateWinner from './components/Pairs/UpdateWinner';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">MatchFight</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/competitions">Competitions</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tournaments">Tournaments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/participants">Participants</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pairs">Pairs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/generate-participants">Generate Participants</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/filter-participants">Filter Participants</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pair-participants">Pair Participants</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pairs-by-level">Pairs by Level</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/update-winner">Update Winner</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/competitions" element={<CompetitionsList />} />
          <Route path="/competitions/create" element={<CreateCompetition />} />
          <Route path="/competitions/:id" element={<CompetitionDetail />} />
          <Route path="/tournaments" element={<TournamentsList />} />
          <Route path="/tournaments/create" element={<CreateTournament />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
          <Route path="/participants" element={<ParticipantsList />} />
          <Route path="/participants/create" element={<CreateParticipant />} />
          <Route path="/participants/:id" element={<ParticipantDetail />} />
          <Route path="/pairs" element={<PairsList />} />
          <Route path="/generate-participants" element={<GenerateParticipants />} />
          <Route path="/filter-participants" element={<FilterParticipants />} />
          <Route path="/pair-participants" element={<PairParticipants />} />
          <Route path="/pairs-by-level" element={<PairsByLevel />} />
          <Route path="/update-winner" element={<UpdateWinner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
