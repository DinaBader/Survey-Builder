import React from 'react';
import './navbar.css';
import {useNavigate} from 'react-router-dom';
function Navbar() {
  const isLoggedIn = !!localStorage.getItem('jwt'); 
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    window.location.href = '/'; 
  };
  const navigateToUserProfile=()=>{
    navigate('/UserProfile');
  }
  const navigateToHome=()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user && user.Role;
    console.log(role);
      if(role=="657edc7c822caeaa5743830b"){
        navigate('/AdminDahsboard');
    }
    else{
        navigate('/UserDashboard');
    }
  }

  return (
    <div className='navbar center'>
      <h1>Survey Manager      
          {isLoggedIn && (
            <div>
          <button className='btn small' onClick={navigateToHome}>Home</button>
          <button className='btn small' onClick={navigateToUserProfile}>Profile</button>
          <button className='btn small' onClick={handleLogout}>Logout</button>

          </div>
          )}
      </h1>
    </div>
  );
}

export default Navbar;
