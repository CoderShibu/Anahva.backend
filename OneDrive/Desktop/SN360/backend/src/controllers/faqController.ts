import { Request, Response } from 'express';
import FAQ from '../models/FAQ';

export const getFAQs = async (req: Request, res: Response) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch FAQs', error: err });
  }
};

export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update FAQ', error: err });
  }
};
