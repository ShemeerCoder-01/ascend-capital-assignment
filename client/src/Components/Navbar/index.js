import React, { useEffect, useState } from 'react';
import './style.css';
import {useNavigate} from 'react-router-dom';
function Navbar() {
    const [user,setUser] = useState('user');
    const navigate = useNavigate();

    useEffect(() => {
      let user = sessionStorage.getItem('userEmail')?.split('@')[0];
      if(user){
        setUser(user);
      }
      
    },[]);

    const handleLogOut = () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userEmail');
      navigate('/login');
    }


  return (
    <div className='navbar'>
        <h1 className='welcome-msg'>Welcome {user}</h1>
        <button className='logout-btn' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Navbar