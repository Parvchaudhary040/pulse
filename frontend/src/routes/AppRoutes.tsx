import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<h1>Landing Page</h1>} />

      <Route path="/login" element={<h1>Login</h1>} />

      <Route path="/dashboard" element={<h1>Dashboard</h1>} />

      <Route path="/profile" element={<h1>Profile</h1>} />

      <Route path="/settings" element={<h1>Settings</h1>} />

    </Routes>
  );
}