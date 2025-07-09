import express from "express";
import authMiddleware from "../middleware/auth.js";
import Expense from "../models/Expense.js";

const router = express.Router();

// Add expense
router.post("/", authMiddleware, async (req, res) => {
  const { desc, amount, category, date } = req.body;

  try {
    const expense = new Expense({
      desc,
      amount,
      category,
      date,
      user: req.user.id, // from token
    });
    await expense.save();
    res.json({ message: "Expense added", expense });
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// Get all expenses for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Delete an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});


export default router;
