import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: { createdAt: false, updatedAt: true } });

export default mongoose.model<IFAQ>('FAQ', FAQSchema);
