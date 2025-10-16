import { Request, Response } from 'express';
import Incident from '../models/Incident';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const totalIncidents = await Incident.countDocuments();
    const byStatus = await Incident.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byType = await Incident.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    res.json({ totalIncidents, byStatus, byType });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: err });
  }
};
