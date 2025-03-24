import React from "react";
import { TableContainer, Table, TableRow, TableCell } from "./styled";
import { Button, TableBody, TableHead } from "@mui/material";

interface Transaction {
  month: string;
  income: number;
  expense: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onDelete: (index: number) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mes</TableCell>
            <TableCell>Ingresos</TableCell>
            <TableCell>Gastos</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.month}</TableCell>
              <TableCell>${transaction.income}</TableCell>
              <TableCell>${transaction.expense}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => onDelete(index)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
