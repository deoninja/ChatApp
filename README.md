# Real-time Chat Application

A full-stack real-time chat application built with React, Node.js, Socket.IO, and PostgreSQL.

## Features

- 🔐 User authentication
- 💬 Public chat room
- 📱 Private messaging between users
- 🚀 Real-time updates using Socket.IO
- 🎨 Modern UI with Tailwind CSS
- 🐳 Docker containerization

## Prerequisites

Make sure you have the following installed on your machine:

- Docker
- Docker Compose
- Node.js (for local development)

## Project Structure

```
.
├── backend/                 # Node.js backend
│   ├── src/                # Source files
│   ├── Dockerfile         
│   └── package.json       
├── frontend/               # React frontend
│   ├── src/               # Source files
│   ├── Dockerfile        
│   └── package.json      
├── docker-compose.yml      # Docker compose configuration
└── README.md              # This file
```

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chat-application
   ```

2. Create a `.env` file in the root directory (optional, default values are provided):
   ```env
   DB_USER=postgres
   DB_PASSWORD=chatapp123
   DB_NAME=chatapp
   JWT_SECRET=your_jwt_secret
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - Database: localhost:5432

## Development

### Frontend Development

The frontend is a React application built with:
- Vite
- React Router for navigation
- Tailwind CSS for styling
- Socket.IO client for real-time communication
- Zustand for state management

### Backend Development

The backend is a Node.js application using:
- Express.js for REST API
- Socket.IO for real-time communication
- Sequelize as ORM
- PostgreSQL for data storage
- JWT for authentication

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Messages
- `GET /api/messages` - Get chat messages
- `POST /api/messages` - Send a new message

## Real-time Events

### Socket.IO Events
- `join_room` - Join a chat room
- `send_message` - Send a message to public room
- `private_message` - Send a private message
- `receive_message` - Receive public messages
- `private_message` - Receive private messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.