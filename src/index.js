import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ENV CHECK ---------------- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
}

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing");
}

/* ---------------- DB ---------------- */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error", err));

const JournalSchema = new mongoose.Schema({
  entry: String,
  createdAt: { type: Date, default: Date.now }
});

const Journal =
  mongoose.models.Journal || mongoose.model("Journal", JournalSchema);

/* ---------------- ROOT ---------------- */
app.get("/", (req, res) => {
  res.send("Anahva backend is running");
});

/* ---------------- CHATBOT (GEMINI) ---------------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction:
        "You are Anahva, a calm, empathetic mental health companion. Respond gently and supportively."
    });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ success: true, reply });

  } catch (err) {
    console.error("❌ CHAT ERROR:", err.message);
    res.status(500).json({
      success: false,
      reply: "I'm here with you. Something went wrong—can you try again?"
    });
  }
});

/* ---------------- JOURNAL SAVE ---------------- */
app.post("/api/journal", async (req, res) => {
  try {
    const { entry } = req.body;
    if (!entry) {
      return res.status(400).json({ error: "Entry required" });
    }

    await Journal.create({ entry });

    res.json({ success: true });

  } catch (err) {
    console.error("❌ JOURNAL SAVE ERROR:", err.message);
    res.status(500).json({ success: false });
  }
});

/* ---------------- JOURNAL HISTORY ---------------- */
app.get("/api/journal/history", async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    console.error("❌ JOURNAL FETCH ERROR:", err.message);
    res.status(500).json([]);
  }
});

export default app;
