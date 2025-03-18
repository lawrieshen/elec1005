import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Login from "./pages/Login";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Layout, Menu } from "antd";
import NavBar from "./components/NavBar";

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
      <Layout
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Ensures no scrolling
        }}
      >
        <NavBar />
        <Layout.Content
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={user ? <Events /> : <Navigate to="/login" replace />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}
