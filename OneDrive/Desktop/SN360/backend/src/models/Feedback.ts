import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  user: mongoose.Types.ObjectId;
  message: string;
  rating?: number;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  rating: Number,
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
