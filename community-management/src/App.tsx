import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Login from "./pages/Login";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import NavBar from "./components/NavBar";
import { Layout } from "antd";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={user ? <Events /> : <Navigate to="/login" replace />} /> {/* Protected Route */}
      </Routes>
    </BrowserRouter>
  );
}
