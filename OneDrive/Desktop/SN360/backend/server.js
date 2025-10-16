const express = require('express');
const swaggerUi = require('swagger-ui-express');
const healthRoutes = require('./routes/health');
const faqRoutes = require('./routes/faq');
const swaggerSpec = require('./swagger/swaggerSpec');

const app = express();
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/faq', faqRoutes);

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
