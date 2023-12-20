import React from 'react';
import './navbar.css';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('jwt'); 

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    window.location.href = '/'; 
  };

  return (
    <div className='navbar center'>
      <h1>Survey Manager</h1>
      {isLoggedIn && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
