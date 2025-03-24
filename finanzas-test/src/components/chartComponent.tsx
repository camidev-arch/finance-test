import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, FilterContainer, FilterSelect } from "./styled";

interface DataPoint {
  month: string;
  income: number;
  expense: number;
}

interface ChartProps {
  data: DataPoint[];
}

export const ChartComponent: React.FC<ChartProps> = ({ data }) => {
  const [filter, setFilter] = useState<"income" | "expense">("income");

  return (
    <ChartContainer>
      <FilterContainer>
        <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value as "income" | "expense")}>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </FilterSelect>
      </FilterContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={filter} stroke={filter === "income" ? "#10b981" : "#ef4444"} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
