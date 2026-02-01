import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

/* ---- ENV CHECK ---- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
}

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing");
}

/* ---- DB (with fallback) ---- */
let journalMemory = [];
let mongoConnected = false;

mongoose.connect(process.env.MONGODB_URI || "")
  .then(() => {
    mongoConnected = true;
    console.log("✅ MongoDB connected");
  })
  .catch(err => {
    mongoConnected = false;
    console.warn("⚠️ MongoDB unavailable, using memory");
  });

const JournalSchema = new mongoose.Schema({
  entry: String,
  createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", JournalSchema);

/* ---- HEALTH CHECK ---- */
app.get("/", (req, res) => {
  res.send("Anahva backend is running");
});

/* ---- CHATBOT ---- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        reply: `I hear you. You said: "${prompt}". (API not configured)`
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: "You are Anahva, a calm, empathetic mental health companion. Respond gently and supportively."
    });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ success: true, reply });

  } catch (err) {
    console.error("❌ CHAT ERROR:", err.message);
    console.error("❌ FULL ERROR:", err);
    console.error("❌ GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
    console.error("❌ GEMINI_API_KEY length:", process.env.GEMINI_API_KEY?.length || 0);

    res.status(500).json({
      success: false,
      error: err.message,
      reply: "I'm here with you. Something went wrong—can you try again?"
    });
  }
});

/* ---- JOURNAL SAVE ---- */
app.post("/api/journal", async (req, res) => {
  try {
    const { entry } = req.body;
    if (!entry) {
      return res.status(400).json({ error: "Entry required" });
    }

    const data = { entry, date: new Date().toISOString() };

    if (mongoConnected) {
      await Journal.create(data);
    }
    journalMemory.push(data);

    res.json({ success: true });

  } catch (err) {
    console.error("❌ JOURNAL SAVE ERROR:", err.message);
    res.status(500).json({ success: false, error: "Save failed" });
  }
});

/* ---- JOURNAL HISTORY ---- */
app.get("/api/journal/history", async (req, res) => {
  try {
    let journals = [];

    if (mongoConnected) {
      journals = await Journal.find().sort({ createdAt: -1 });
    } else {
      journals = journalMemory.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    res.json(journals);
  } catch (err) {
    console.error("❌ JOURNAL FETCH ERROR:", err.message);
    res.json(journalMemory);
  }
});

export default app;
