import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MedicManager from './view/manager/medic/MedicManager';

export default () => {
  return (
    <React.Fragment className="App">
      <ToastContainer />
      <MedicManager />
    </React.Fragment>
  );
}
