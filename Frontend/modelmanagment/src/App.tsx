/** @format */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import CreateAccount from "./pages/Account";

import "./api/axiosConfig";
import { Toaster } from "./components/ui/toaster";
import JobPage from "./pages/JobPage";
import { useAuthStore } from "./state/authStore";
import { useEffect } from "react";
import ModelDashboard from "./pages/ModelDashboard";

function App() {
  const loadToken = useAuthStore((state) => state.loadToken);
  useEffect(() => {
    loadToken();
    console.log("LOAD TOKEN!");
  }, [loadToken]);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/job/:jobId" element={<JobPage />} />
          <Route path="/model-dashboard" element={<ModelDashboard />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
