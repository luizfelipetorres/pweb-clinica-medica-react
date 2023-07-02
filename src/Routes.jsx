import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./view/pages/home/Home";
import MedicForm from "./view/pages/forms/MedicForm";
import MedicManager from "./view/pages/manager/MedicManager";
import ErrorPage from "./view/pages/error/ErrorPage";

export default () => {
  return (
    <Routes>
      <Route path="/medic/form" element={<MedicForm />} />
      <Route path="/medic" element={<MedicManager />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
