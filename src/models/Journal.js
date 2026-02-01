import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  entry: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Journal ||
  mongoose.model("Journal", JournalSchema);
