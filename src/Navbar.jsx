import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'yellow', color: 'red', padding: '10px' }}>
      <Link to="/characters" style={{ margin: '0 10px' }}>Character List</Link>
      <Link to="/character-details" style={{ margin: '0 10px' }}>Character Details</Link>
    </nav>
  );
};

export default Navbar;