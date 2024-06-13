import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  
  const user = useSelector(state => state.auth.user);

  
  const userEmail = user ? user.email : ''; 

  return (
    <div className='body'>
      <Navbar/>
      <h1>Hi {userEmail}</h1>
    </div>
  );
}

export default App;
