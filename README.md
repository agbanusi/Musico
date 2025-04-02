# Music Booking API - Musico API

A comprehensive API for a music booking platform that connects artists with event organizers. This API handles user authentication, artist profiles, event listings, bookings, and payment processing.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Artist Profiles**: Create and manage artist profiles with details, rates, and media
- **Event Management**: Create and manage events with details and scheduling
- **Booking System**: Request, confirm, and manage bookings between artists and events
- **Payment Processing**: Handle payments for bookings with various payment methods
- **Notifications**: RabbitMQ-based notification system for real-time updates

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **API Documentation**: Swagger/OpenAPI
- **Messaging**: RabbitMQ for notifications
- **Validation**: Class Validator & Class Transformer

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- RabbitMQ

## Installation

```bash
# Install dependencies
$ yarn install

# Set up environment variables
# Copy the example .env file and adjust as needed
$ cp .env.example .env
```

## Configuration

Configure your environment variables in the `.env` file:

```
# App
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=music_booking

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRATION=24h

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_QUEUE=notifications
```

## Running the Application

```bash
# Development mode
$ yarn start:dev

# Production mode
$ yarn start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api/docs
```

## Database Schema

The application uses the following main entities:

- **User**: Authentication and user details
- **Artist**: Artist profiles linked to users
- **Event**: Event listings with details and scheduling
- **Booking**: Connections between artists and events
- **Payment**: Payment details for bookings

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - User login

### Users

- `POST /api/v1/users` - Create user
- `GET /api/v1/users` - Get all users (admin)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (admin)

### Artists

- `POST /api/v1/artists` - Create artist profile
- `GET /api/v1/artists` - Get all artists
- `GET /api/v1/artists/:id` - Get artist by ID
- `PATCH /api/v1/artists/:id` - Update artist
- `DELETE /api/v1/artists/:id` - Delete artist

### Events

- `POST /api/v1/events` - Create event
- `GET /api/v1/events` - Get all events
- `GET /api/v1/events/:id` - Get event by ID
- `PATCH /api/v1/events/:id` - Update event
- `DELETE /api/v1/events/:id` - Delete event

### Bookings

- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `PATCH /api/v1/bookings/:id/status` - Update booking status
- `DELETE /api/v1/bookings/:id` - Cancel booking

### Payments

- `POST /api/v1/payments` - Create payment
- `GET /api/v1/payments/:id` - Get payment details

## License

[MIT licensed](LICENSE)
