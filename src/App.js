import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from './Routes';
import Footer from './view/layout/Footer';
import Navbar from './view/layout/Navbar';
export default () => {
  return (
    <React.Fragment className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes />
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
