import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Admin from "../pages/Admin";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Main />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
