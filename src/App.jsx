import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MissionControl from './pages/MissionControl';
import LabViewer from './pages/LabViewer';
import PremiumModal from './components/PremiumModal';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission-control" element={<MissionControl />} />
        <Route path="/lab/:id" element={<LabViewer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PremiumModal />
    </Router>
  );
}

export default App;
