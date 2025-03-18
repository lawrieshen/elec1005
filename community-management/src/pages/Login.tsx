import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Login successful!");
      navigate("/events"); // Redirect to events page
    } catch (error) {
      message.error("Invalid email or password");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      message.success("Logged in with Google!");
      navigate("/events"); // Redirect after Google login
    } catch (error) {
      message.error("Google sign-in failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}>
      <Card style={{ width: 400, padding: 20, borderRadius: 8, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Typography.Title level={2} style={{ textAlign: "center" }}>Login</Typography.Title>
        
        {/* Email & Password Login Form */}
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>


        {/* Google Login Button */}
        <Button type="default" icon={<GoogleOutlined />} onClick={handleGoogleLogin} loading={loading} block style={{ marginTop: 10 }}>
            Sign in with Google
        </Button>
      </Card>
    </div>
  );
}
