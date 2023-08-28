import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="./register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AppRoutes;
