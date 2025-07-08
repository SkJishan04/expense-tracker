import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is protected data.`,
    user: req.user
  });
});

export default router;
