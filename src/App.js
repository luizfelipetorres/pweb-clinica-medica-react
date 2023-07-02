import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MedicForm from './view/forms/medic/MedicForm';

export default () => {
  return (
    <React.Fragment className="App">
      <ToastContainer />
      <MedicForm />
    </React.Fragment>
  );
}
