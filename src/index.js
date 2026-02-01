import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ROOT CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("Anahva backend is running");
});

/* ---------------- CHATBOT ---------------- */
app.post("/api/chat", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.json({
    success: true,
    reply: `Received: ${prompt}`
  });
});

/* ---------------- JOURNAL ---------------- */
app.post("/api/journal", (req, res) => {
  const { entry } = req.body;

  if (!entry) {
    return res.status(400).json({
      success: false,
      message: "Journal entry is required"
    });
  }

  // Temporary in-memory save
  console.log("Journal Entry Saved:", entry);

  res.json({
    success: true,
    message: "Journal entry saved successfully"
  });
});

export default app;
