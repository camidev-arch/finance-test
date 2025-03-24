require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/transactions", (req, res) => {
    const { month, income, expense } = req.body;
  
    db.get("SELECT * FROM transactions WHERE month = ?", [month], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (row) {
        db.run(
          `UPDATE transactions SET 
            income = income + ?, 
            expense = expense + ? 
            WHERE month = ?`,
          [income, expense, month],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ message: "Transaction updated", month, income, expense });
          }
        );
      } else {
        db.run(
          `INSERT INTO transactions (month, income, expense) VALUES (?, ?, ?)`,
          [month, income, expense],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ message: "Transaction added", month, income, expense });
          }
        );
      }
    });
  });
  

app.delete("/transactions/:id", (req, res) => {
    const { id } = req.params;
  
    db.run("DELETE FROM transactions WHERE id = ?", [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (this.changes === 0) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }
  
      res.json({ message: "Transaction deleted", deletedId: id });
    });
  });
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
