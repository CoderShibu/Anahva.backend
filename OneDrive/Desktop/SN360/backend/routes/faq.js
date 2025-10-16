const express = require('express');
const router = express.Router();

// In-memory FAQ data
let faqs = [
  { id: 1, question: 'What is SafeNet?', answer: 'A safety platform.' },
  { id: 2, question: 'How to report an incident?', answer: 'Use the report form.' }
];

/**
 * @swagger
 * /api/faq:
 *   get:
 *     summary: Get all FAQs
 *     responses:
 *       200:
 *         description: List of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 */
router.get('/', (req, res) => {
  res.json(faqs);
});

/**
 * @swagger
 * /api/faq/{id}:
 *   patch:
 *     summary: Update a FAQ entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated FAQ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question:
 *                   type: string
 *                 answer:
 *                   type: string
 *       404:
 *         description: FAQ not found
 */
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const faq = faqs.find(f => f.id === id);
  if (!faq) return res.status(404).json({ error: 'FAQ not found' });
  if (req.body.question) faq.question = req.body.question;
  if (req.body.answer) faq.answer = req.body.answer;
  res.json(faq);
});

module.exports = router;
