import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
