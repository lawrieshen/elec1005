import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";

const { Header, Content } = Layout;

export default function Home() {
  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "register", label: <Link to="/register">Register</Link> },
    { key: "login", label: <Link to="/login">Login</Link> },
    { key: "events", label: <Link to="/events">Events</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      {/* Full-width Header */}
      <Header style={{ backgroundColor: "#001529", display: "flex", alignItems: "center", width: "100%" }}>
        <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flexGrow: 1, justifyContent: "center" }} />
      </Header>

      {/* Full-width Content */}
      <Content
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Typography.Title level={1}>Welcome to Community Management</Typography.Title>
      </Content>
    </Layout>
  );
}
