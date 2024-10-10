import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import CharacterList from './CharacterList';
import CharacterDetails from './CharacterDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/character-details" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
};

export default App;