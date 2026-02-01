import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ROOT ROUTE (THIS FIXES 404)
app.get("/", (req, res) => {
  res.status(200).send("Anahva backend is running");
});

// TEST API
app.post("/api/chat", (req, res) => {
  const { prompt } = req.body;

  res.json({
    success: true,
    reply: `Received: ${prompt}`
  });
});

export default app; // 🔴 REQUIRED FOR VERCEL
