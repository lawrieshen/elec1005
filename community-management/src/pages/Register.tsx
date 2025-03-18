import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleRegister = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      message.success("Account created successfully!");
      navigate("/events");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      message.success("Signed up with Google!");
      navigate("/events");
    } catch (error) {
      message.error("Google sign-up failed");
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      width: "100vw",
      height: "100vh"
    }}>
      <Card style={{ width: 400, padding: 20, borderRadius: 8, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Typography.Title level={2} style={{ textAlign: "center" }}>Register</Typography.Title>

        {/* Email & Password Registration Form */}
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: "Password must be at least 6 characters" }]}>
            <Input.Password placeholder="Create a password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sign Up
          </Button>
        </Form>

        {/* Google Sign-Up Button */}
        <Button type="default" icon={<GoogleOutlined />} onClick={handleGoogleSignUp} loading={loading} block style={{ marginTop: 10 }}>
          Sign up with Google
        </Button>
      </Card>
    </div>
  );
}
