import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Journal from "./models/Journal.js";

const app = express();

app.use(cors());
app.use(express.json());

/* --------------- DATABASE CONNECTION --------------- */
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ MongoDB connected");
    } else {
      console.log("⚠️ MONGODB_URI not set - Journal history won't persist");
    }
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

// Connect to MongoDB
connectDB();

/* --------------- GEMINI AI SETUP --------------- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* --------------- ROOT CHECK --------------- */
app.get("/", (req, res) => {
  res.send("Anahva backend is running");
});

/* --------------- CHATBOT (GEMINI AI) --------------- */
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use Gemini API if key exists
    if (process.env.GEMINI_API_KEY) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      res.json({
        success: true,
        reply: response
      });
    } else {
      // Fallback if no API key
      res.json({
        success: true,
        reply: `I received your message: "${prompt}". Please set GEMINI_API_KEY to enable AI responses.`
      });
    }

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({
      success: false,
      reply: "I'm having trouble responding right now."
    });
  }
});

/* --------------- JOURNAL (SAVE) --------------- */
app.post("/api/journal", async (req, res) => {
  try {
    const { entry } = req.body;

    if (!entry) {
      return res.status(400).json({
        success: false,
        message: "Journal entry is required"
      });
    }

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      await Journal.create({ entry });
      console.log("📝 Journal saved to MongoDB:", entry.substring(0, 50));
    } else {
      console.log("⚠️ MongoDB not connected - journal saved locally only");
    }

    res.json({
      success: true,
      message: "Journal entry saved successfully"
    });

  } catch (err) {
    console.error("Journal save error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save journal entry"
    });
  }
});

/* --------------- JOURNAL (HISTORY) --------------- */
app.get("/api/journal/history", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const journals = await Journal.find().sort({ createdAt: -1 }).limit(50);
      res.json(journals);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error("Journal history error:", err);
    res.status(500).json({ error: "Failed to fetch journal history" });
  }
});

export default app;
