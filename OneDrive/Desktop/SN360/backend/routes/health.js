const express = require('express');
const router = express.Router();

const startTime = Date.now();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server status and uptime
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uptime:
 *                   type: number
 */
router.get('/', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  res.json({ status: 'ok', uptime });
});

module.exports = router;
