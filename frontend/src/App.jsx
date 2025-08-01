import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectedWrapper from "./utils/UserProtectedWrapper";
import UserDashboard from "./pages/UserDashboard";
import CaptainDashboard from "./pages/CaptainDashboard";
import CaptainProtectedWrapper from "./utils/CaptainProtectedWrapper";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/user-dashboard"
          element={
            <UserProtectedWrapper>
              <UserDashboard />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-dashboard"
          element={
            <CaptainProtectedWrapper>
              <CaptainDashboard />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;
