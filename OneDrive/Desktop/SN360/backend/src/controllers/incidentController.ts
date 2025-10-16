import { Request, Response } from 'express';
import Incident from '../models/Incident';

export const createIncident = async (req: Request, res: Response) => {
  try {
    const { type, location, description } = req.body;
    const reporter = (req as any).user.id;
    const incident = await Incident.create({ type, location, description, reporter });
    res.status(201).json({ message: 'Incident reported', incident });
  } catch (err) {
    res.status(500).json({ message: 'Failed to report incident', error: err });
  }
};

export const getIncidents = async (req: Request, res: Response) => {
  try {
    const { status, type, nearLat, nearLng, radius } = req.query;
    let filter: any = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    // TODO: Add geospatial filtering if needed
    const incidents = await Incident.find(filter).populate('reporter', 'name email role');
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch incidents', error: err });
  }
};

export const updateIncident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = (req as any).user.id;
    const incident = await Incident.findById(id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    // Add to history
    incident.history.push({ action: 'update', user: userId, timestamp: new Date(), note: updates.status ? `Status changed to ${updates.status}` : '' });
    Object.assign(incident, updates);
    await incident.save();
    res.json({ message: 'Incident updated', incident });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update incident', error: err });
  }
};
