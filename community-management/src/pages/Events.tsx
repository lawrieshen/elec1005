import { useEffect, useState } from "react";
import { List, Input, Button, Typography } from "antd";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <Typography.Title level={3} style={{ margin: 0 }}>Community Events</Typography.Title>
                {user && (
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </div>

            {user && (
                <Typography.Text strong style={{ display: "block", marginBottom: 20 }}>
                    Welcome, {user.displayName || user.email}!
                </Typography.Text>
            )}
            
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <Input 
                    placeholder="Add a new event..." 
                    value={event} 
                    onChange={(e) => setEvent(e.target.value)} 
                    style={{ flex: 1 }}
                />
                <Button type="primary" onClick={handleAddEvent}>
                    Add Event
                </Button>
            </div>
            
            <List
                dataSource={events}
                renderItem={(e) => (
                    <List.Item style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        {e}
                    </List.Item>
                )}
                style={{ background: "white", padding: 20, borderRadius: 8 }}
            />
        </div>
    );
}
