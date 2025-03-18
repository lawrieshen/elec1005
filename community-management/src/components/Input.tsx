import React from "react";
import { Input } from "antd";

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export default function CustomInput({placeholder, value, onChange, type = "text"}: InputProps) {
    return <Input type={type} placeholder={placeholder} value={value} onChange={onChange}></Input>;
}