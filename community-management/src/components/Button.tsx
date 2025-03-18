import { Button } from "antd";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "primary" | "default" | "dashed" | "link"
}

export default function CustomButton({children, onClick, type = "primary"}: ButtonProps) {
    return <Button type={type} onClick={onClick}>{children}</Button>;
}