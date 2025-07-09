import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js"; // ⬅️ Import middleware

const router = express.Router();

// ✅ REGISTER
// ✅ REGISTER + return token
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // ✅ Generate token after registration
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // ⬅️ Include username in the token
    const token = jwt.sign(
      { id: user._id, username: user.username },  // ⬅️ include username here
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ PROTECTED ROUTE (test this from frontend or Postman)
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is protected data.`,
    user: req.user,
  });
});

export default router;
