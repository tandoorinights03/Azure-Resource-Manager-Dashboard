import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QueryPage from './QueryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QueryPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
