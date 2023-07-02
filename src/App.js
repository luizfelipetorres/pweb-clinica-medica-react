import './App.css';
import React from 'react';
import Home from './pages/home/Home'
import Navbar from './components/Navbar';
import MedicForm from './view/forms/medic/MedicForm';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MedicForm from './view/forms/medic/MedicForm';

export default () => {
  return (
    <React.Fragment className="App">
      <ToastContainer />
      <Navbar/>
      <Home/>
    </React.Fragment>
  );
}
