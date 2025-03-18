import { Card } from "antd";

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export default function CustomCard({title, children}: CardProps) {
    return <Card title={title}>{children}</Card>;
}