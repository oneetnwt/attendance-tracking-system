# SBO Attendance Tracking System

A modern web-based attendance tracking system for SBO (Student Body Organization) with real-time updates and a beautiful user interface.

## Features

- 📱 Real-time attendance tracking
- 👥 Student profile management
- 📊 Attendance records visualization
- 🎨 Modern and responsive UI
- 📅 Date and time tracking
- 🌙 Dark mode interface
- ⚡ Fast and smooth interactions

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications

### Backend

- Node.js
- Express.js
- MongoDB
- Cloudinary
- Cors

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/attendance-tracking-system.git
cd attendance-tracking-system
```

2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
   Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

4. Start the application

```bash
# Start the server
cd server
npm run dev

# Start the client
cd ../client
npm run dev
```

## Project Structure

```
attendance-tracking-system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Static assets
│   │   └── App.jsx       # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    └── server.js        # Server entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Attendance

- `POST /api/record` - Record attendance
- `GET /api/get-records` - Get attendance records
- `GET /api/records/:id` - Get specific record

### User Management

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Features in Detail

### Real-time Attendance Tracking

- Instant attendance recording
- Morning and afternoon session tracking
- Visual status indicators
- Timestamp recording

### User Interface

- Clean and modern design
- Responsive layout
- Smooth animations
- Intuitive navigation
- Loading states and skeleton screens

### Security

- JWT-based authentication
- Secure password handling
- Protected routes
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Icons from [Heroicons](https://heroicons.com/)
- UI inspiration from modern web applications
- Community support and feedback
