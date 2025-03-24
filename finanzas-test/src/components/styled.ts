import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 24px;
  background-color: #f3f4f6;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 16px;
`;

export const Card = styled.div<{ color: string }>`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const CardAmount = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #111827;
`;

export const ChartContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
`;


export const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background: #f9fafb;
  text-align: left;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  color: #374151;
`;