import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./view/pages/home/Home";
import MedicForm from "./view/pages/forms/MedicForm";
import PatientForm from "./view/pages/forms/PatientForm";
import MedicManager from "./view/pages/manager/MedicManager";
import PatientManager from "./view/pages/manager/PatientManager";
import ErrorPage from "./view/pages/error/ErrorPage";
import AppointmentManager from "./view/pages/manager/AppointmentManager";

export default () => {
  return (
    <Routes>
      <Route path="/medic/form-put/:crm" element={<MedicForm isUpdate={true}/>} />
      <Route path="/medic/form-post" element={<MedicForm isUpdate={false}/>} />
      <Route path="/medic" element={<MedicManager />} />
      <Route path="/patient" element={<PatientManager />} />
      <Route path="/patient/form-put/:cpf" element={<PatientForm isUpdate={true}/>} />
      <Route path="/patient/form-post" element={<PatientForm isUpdate={false}/>} />
      <Route path="/appointment" element={<AppointmentManager/>} />
      <Route path="/pweb-clinica-medica-react" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
