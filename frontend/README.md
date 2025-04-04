Student-Mentor Portal

Project Overview

This is a full-stack web application that allows students to book sessions with mentors. The application uses MongoDB for the database, ReactJS for the frontend, and Node.js with Express for the backend.

Features

Students can:

Register and log in

View a list of available mentors

Book sessions with mentors

Mentors can:

Register and log in

Set their availability for sessions

View and manage bookings

Setup Instructions

⿡ Open Visual Studio Code

Open VS Code on your system.

Click File → Open Folder...

Select the project folder student-mentor-portal.

Click "Open"

⿢ Open Terminal

Click on the "Terminal" menu at the top.

Select "New Terminal"

OR use the shortcut: Ctrl +  (backtick key)

Backend Setup

⿡ Navigate to Backend Folder

cd student-mentor-portal/backend

⿢ Install Dependencies

npm install

⿣ Configure Environment Variables

Create a .env file in the backend folder.

Add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

⿤ Start Backend Server

npm start

If successful, the server will start at: http://localhost:5000

Frontend Setup

⿡ Navigate to Frontend Folder

cd ../frontend

⿢ Install Dependencies

npm install

⿣ Start React Application

npm start

If successful, the React app will open at: http://localhost:3000

API Endpoints

Auth Routes

POST /api/auth/register - Register as a student or mentor

POST /api/auth/login - Login as a student or mentor

Mentor Routes

GET /api/mentors - Fetch all mentors

POST /api/mentors/availability - Set mentor availability

Booking Routes

POST /api/bookings - Create a session booking

GET /api/bookings - View all bookings (mentors only)

Technologies Used

Frontend: React.js, TailwindCSS

Backend: Node.js, Express.js, MongoDB

Authentication: JSON Web Tokens (JWT)
