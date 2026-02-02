import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatRequest, ChatResponse } from "./types/chat";
import { JournalEntry } from "./types/journal";
<<<<<<< HEAD

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());
=======
import dotenv from "dotenv";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
);
app.use(express.json());
dotenv.config();
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894

/* ---- ENV CHECK ---- */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
}

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI missing");
}

/* ---- DB (with fallback) ---- */
let journalMemory: JournalEntry[] = [];
let mongoConnected = false;

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || "")
=======
mongoose
  .connect(process.env.MONGODB_URI || "")
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
  .then(() => {
    mongoConnected = true;
    console.log("✅ MongoDB connected");
  })
<<<<<<< HEAD
  .catch(err => {
=======
  .catch((err) => {
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
    mongoConnected = false;
    console.warn("⚠️ MongoDB unavailable, using memory");
  });

const JournalSchema = new mongoose.Schema({
  text: String,
<<<<<<< HEAD
  createdAt: String
});

const Journal = mongoose.models.Journal || mongoose.model("Journal", JournalSchema);
=======
  createdAt: String,
});

const Journal =
  mongoose.models.Journal || mongoose.model("Journal", JournalSchema);
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894

/* ---- HEALTH CHECK ---- */
app.get("/", (req: Request, res: Response) => {
  res.send("Anahva backend is running");
});

/* ---- CHATBOT ---- */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post(
  "/api/chat",
  async (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse>) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ reply: "Prompt missing" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
<<<<<<< HEAD
          reply: `I hear you. You said: "${prompt}". (API not configured)`
=======
          reply: `I hear you. You said: "${prompt}". (API not configured)`,
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
        });
      }

      const model = genAI.getGenerativeModel({
<<<<<<< HEAD
        model: "gemini-pro",
        systemInstruction: "You are Anahva, a calm, empathetic mental health companion. Respond gently and supportively."
=======
        model: "models/gemini-2.5-flash",
        systemInstruction:
          "You are Anahva, a calm, empathetic mental health companion. Respond gently and supportively.",
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
      });

      const result = await model.generateContent(prompt);
      const reply = result.response.text();

      res.json({ reply });
<<<<<<< HEAD

    } catch (err) {
      console.error("❌ CHAT ERROR:", err);
      res.status(500).json({
        reply: "I'm here with you. Something went wrong—can you try again?"
      });
    }
  }
=======
    } catch (err) {
      console.error("❌ CHAT ERROR:", err);
      res.status(500).json({
        reply: "I'm here with you. Something went wrong—can you try again?",
      });
    }
  },
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
);

/* ---- JOURNAL SAVE ---- */
app.post(
  "/api/journal",
  async (req: Request<{}, {}, { entry: string }>, res: Response) => {
    try {
      const { entry } = req.body;

      if (!entry) {
        return res.status(400).json({ error: "Entry missing" });
      }

      const journal: JournalEntry = {
        text: entry,
<<<<<<< HEAD
        createdAt: new Date().toISOString()
=======
        createdAt: new Date().toISOString(),
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
      };

      if (mongoConnected) {
        await Journal.create(journal);
      }
      journalMemory.push(journal);

      res.json({ success: true });
<<<<<<< HEAD

=======
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
    } catch (err) {
      console.error("❌ JOURNAL SAVE ERROR:", err);
      res.status(500).json({ success: false, error: "Save failed" });
    }
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
);

/* ---- JOURNAL HISTORY ---- */
app.get(
  "/api/journal/history",
  async (_req: Request, res: Response<JournalEntry[]>) => {
    try {
      let journals: JournalEntry[] = [];

      if (mongoConnected) {
        journals = await Journal.find().sort({ createdAt: -1 });
      } else {
<<<<<<< HEAD
        journals = journalMemory.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
=======
        journals = journalMemory.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
        );
      }

      res.json(journals);
    } catch (err) {
      console.error("❌ JOURNAL FETCH ERROR:", err);
      res.json(journalMemory);
    }
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 94cf55708ecf343c1f89d2c455aff79f76dfe894
);

/* ---- START SERVER ---- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

export default app;
