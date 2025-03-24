import React from "react";
import { Card, CardTitle, CardAmount } from "./styled";

interface SummaryCardProps {
  title: string;
  amount: number;
  color: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, color }) => {
  return (
    <Card color={color}>
      <CardTitle>{title}</CardTitle>
      <CardAmount>${amount.toLocaleString()}</CardAmount>
    </Card>
  );
};
