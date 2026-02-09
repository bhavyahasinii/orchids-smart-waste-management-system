import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

export default router;
