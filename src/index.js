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

/* ---- AUTH (Simple Demo) ---- */
app.post("/api/auth/demo", (req, res) => {
  const { name, password } = req.body;

  // Simple demo auth - accepts any username/password
  // For demo purposes, username and password must match (e.g., Shibasish/Shibasish)
  if (name && password && name === password) {
    res.json({
      success: true,
      token: `demo_token_${Date.now()}`,
      user: { name }
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid credentials. For demo, use same value for username and password."
    });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.json({ success: true });
});

app.get("/api/auth/verify", (req, res) => {
  // For demo, always return valid if a token is provided
  const token = req.headers.authorization;
  if (token) {
    res.json({ success: true, valid: true });
  } else {
    res.status(401).json({ success: false, error: "No token" });
  }
});

/* ---- CHATBOT ---- */
// Strict simplified version requested by user
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ reply: "Prompt missing" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY missing");
      return res.status(500).json({ reply: "Server misconfigured" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using gemini-2.0-flash as gemini-pro is deprecated
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    console.log("CHAT OK:", reply);

    return res.json({ reply });
  } catch (err) {
    console.error("CHAT ERROR:", err);
    return res.status(500).json({ reply: "Gemini failed" });
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
