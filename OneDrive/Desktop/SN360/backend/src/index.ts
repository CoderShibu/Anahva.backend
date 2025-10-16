import { errorHandler } from './middleware/errorHandler';
import http from 'http';
import { setupWebSocket } from './config/socket';
import { setupSwagger } from './config/swagger';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { json, urlencoded } from 'express';

import { PORT } from './config/env';
import { connectDB } from './config/db';

import authRoutes from './routes/auth';
import incidentRoutes from './routes/incident';
import userRoutes from './routes/user';
import feedbackRoutes from './routes/feedback';
import faqRoutes from './routes/faq';
import analyticsRoutes from './routes/analytics';



const app = express();
connectDB();

// Create HTTP server for Express and Socket.io
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));


// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Swagger API docs
setupSwagger(app);


// Auth routes
app.use('/api/auth', authRoutes);


// Incident routes
app.use('/api/incidents', incidentRoutes);


// User routes
app.use('/api/users', userRoutes);

// Feedback routes
app.use('/api/feedback', feedbackRoutes);

// FAQ routes
app.use('/api/faq', faqRoutes);

// Analytics routes
app.use('/api/analytics', analyticsRoutes);


// WebSocket server for real-time updates
setupWebSocket(server);


// Global error handler
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
