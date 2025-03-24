import { useState, useEffect } from "react";

import { DashboardContainer, Title, CardGrid } from "./styled";
import { Button, Modal, TextField, Box } from "@mui/material";
import { SummaryCard } from "./summaryCard";
import { ChartComponent } from "./chartComponent";
import { TransactionsTable } from "./transactionsTable";

interface DataPoint {
  id?: number;
  month: string;
  income: number;
  expense: number;
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ month: "", income: "", expense: "" });

  const fetchTransactions = () => {
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => setData(data.map((item: any) => ({
        ...item,
        income: Number(item.income) || 0,
        expense: Number(item.expense) || 0
      })))).catch((error) => console.error("Error fetching transactions:", error));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const balance = totalIncome - totalExpense;

  const handleAddTransaction = () => {
    const formattedTransaction = {
      month: newTransaction.month,
      income: Number(newTransaction.income) || 0,
      expense: Number(newTransaction.expense) || 0,
    };

    fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedTransaction),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTransactions();
        setModalOpen(false);
        setNewTransaction({ month: "", income: "", expense: "" });
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const handleDeleteTransaction = (id: number) => {
    console.log("Deleting transaction with ID:", id); // <-- Agregar esto para depuración
    fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" })
      .then(() => fetchTransactions())
      .catch((error) => console.error("Error deleting transaction:", error));
  };
  

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <CardGrid>
        <SummaryCard title="Balance Actual" amount={balance} color="#3b82f6" />
        <SummaryCard title="Ingresos" amount={totalIncome} color="#10b981" />
        <SummaryCard title="Gastos" amount={totalExpense} color="#ef4444" />
      </CardGrid>
      <ChartComponent data={data} />
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Agregar Transacción
      </Button>
      <TransactionsTable transactions={data} onDelete={handleDeleteTransaction} />

      {/* Modal para agregar transacción */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", width: 300, margin: "100px auto", borderRadius: 2 }}>
          <h2>Agregar Transacción</h2>
          <TextField
            label="Mes"
            fullWidth
            margin="normal"
            value={newTransaction.month}
            onChange={(e) => setNewTransaction({ ...newTransaction, month: e.target.value })}
          />
          <TextField
            label="Ingreso"
            type="number"
            fullWidth
            margin="normal"
            value={newTransaction.income}
            onChange={(e) => setNewTransaction({ ...newTransaction, income: e.target.value })}
          />
          <TextField
            label="Gasto"
            type="number"
            fullWidth
            margin="normal"
            value={newTransaction.expense}
            onChange={(e) => setNewTransaction({ ...newTransaction, expense: e.target.value })}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddTransaction}>
            Agregar
          </Button>
        </Box>
      </Modal>
    </DashboardContainer>
  );
};

