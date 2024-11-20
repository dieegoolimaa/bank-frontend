import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
