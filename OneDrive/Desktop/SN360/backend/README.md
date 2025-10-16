# safenet-backend

Emergency management system backend built with Express.js and TypeScript.

## Features
- User management (registration, login, roles, JWT authentication, profile management)
- Incident reporting and management (CRUD, status updates, history)
- Real-time communication (WebSockets for live updates)
- Notifications (email/SMS/push, stubbed)
- Location services (incident geolocation, mapping endpoints)
- Admin dashboard APIs (analytics, user/incident management)
- Feedback and FAQ endpoints
- Security (input validation, rate limiting, audit logs)
- API documentation (Swagger/OpenAPI)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with your environment variables (see `.env.example`).
3. Run in development mode:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build
   ```
5. Start production server:
   ```sh
   npm start
   ```

## Folder Structure
- `src/` — Source code
- `dist/` — Compiled code

## License
MIT
