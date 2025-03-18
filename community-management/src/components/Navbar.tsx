import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";


export default function NavBar() {
    const menuItems = [
      { key: "home", label: <Link to="/">Home</Link> },
      { key: "register", label: <Link to="/register">Register</Link> },
      { key: "login", label: <Link to="/login">Login</Link> },
      { key: "events", label: <Link to="/events">Events</Link> },
    ];
  
    return (
      <Header style={{ backgroundColor: "#001529", display: "flex", alignItems: "center", width: "100%", height: "auto" }}>
        <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flexGrow: 1, justifyContent: "center" }} />
      </Header>
    );
  }