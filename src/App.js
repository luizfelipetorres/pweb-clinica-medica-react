import './App.css';
import React from 'react';
import MedicForm from './view/forms/medic/MedicForm';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default () => {
  return (
    <React.Fragment className="App">
      <ToastContainer />
      <MedicForm />
    </React.Fragment>
  );
}
