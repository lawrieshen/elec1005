import { useEffect, useState } from "react";
import { List, Input, Button, Card, Layout, Typography, Menu } from "antd";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;

export default function Events() {
    const [event, setEvent] = useState<string>("");
    const [events, setEvents] = useState<string[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth();
    const navigate = useNavigate();

    const handleAddEvent = () => {
        if (event.trim()) {
        setEvents([...events, event]);
        setEvent("");
        }
    };

    const handleLogout = async () => {
        try {
        await signOut(auth);
        navigate("/login"); // Redirect to login after logging out
        } catch (error) {
        console.error("Logout failed", error);
        }
    };

    // Track Authentication State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe(); // Cleanup listener
      }, []);

  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "register", label: <Link to="/register">Register</Link> },
    { key: "login", label: <Link to="/login">Login</Link> },
    { key: "events", label: <Link to="/events">Events</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Full-width Header */}
        <Header style={{ backgroundColor: "#001529", display: "flex", alignItems: "center", width: "100%" }}>
            <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flexGrow: 1, justifyContent: "center" }} />
        </Header>

        <Content style={{ width: "100%", maxWidth: 800, padding: "20px" }}>
            <Card title="Community Events" style={{ width: "100%" }}>
                {user && (
                <Typography.Text strong style={{ display: "block", marginBottom: 10 }}>
                    Welcome, {user.displayName || user.email}!
                </Typography.Text>
                )}
                <Input placeholder="Add event..." value={event} onChange={(e) => setEvent(e.target.value)} />
                <Button type="primary" onClick={handleAddEvent} style={{ marginTop: 10 }}>
                Add Event
                </Button>
                <List
                dataSource={events}
                renderItem={(e) => <List.Item>{e}</List.Item>}
                style={{ marginTop: 10 }}
                />
            </Card>

            {/* Logout Button */}
            {user && (
            <Button type="primary" danger onClick={handleLogout} style={{ marginTop: 20, width: "100%" }}>
                Logout
            </Button>
            )}
        </Content>
    </Layout>
  );
}
