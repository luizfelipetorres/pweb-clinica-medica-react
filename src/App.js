import './App.css';
import React from 'react';
import Home from './pages/home/Home'
import Navbar from './components/Navbar';

export default () => {
  return (
    <React.Fragment className="App">
      <Navbar/>
      <Home/>
    </React.Fragment>
  );
}
