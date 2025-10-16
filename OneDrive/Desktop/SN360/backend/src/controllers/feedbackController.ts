import { Request, Response } from 'express';
import Feedback from '../models/Feedback';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { message, rating } = req.body;
    const user = (req as any).user.id;
    const feedback = await Feedback.create({ user, message, rating });
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit feedback', error: err });
  }
};
