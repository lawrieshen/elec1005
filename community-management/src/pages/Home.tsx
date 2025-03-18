import { Typography } from "antd";

export default function Home() {
  return (
    <div
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
    </div>
  );
}
