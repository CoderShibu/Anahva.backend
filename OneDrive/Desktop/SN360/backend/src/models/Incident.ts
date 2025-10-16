import mongoose, { Document, Schema } from 'mongoose';

export interface IIncident extends Document {
  type: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description: string;
  reporter: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'resolved';
  history: Array<{
    action: string;
    user: mongoose.Types.ObjectId;
    timestamp: Date;
    note?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const IncidentSchema = new Schema<IIncident>({
  type: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: String,
  },
  description: { type: String, required: true },
  reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  history: [
    {
      action: String,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now },
      note: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model<IIncident>('Incident', IncidentSchema);
