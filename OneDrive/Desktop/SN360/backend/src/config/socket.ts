import { Server } from 'socket.io';
import http from 'http';

export let io: Server;

export const setupWebSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
