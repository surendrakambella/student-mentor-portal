📘 Student-Mentor Portal
A full-stack web application that allows students to book sessions with mentors. Built using MongoDB, Express.js, ReactJS, and NodeJS (MERN stack).

🚀 Features
👩‍🎓 For Students:
Register & login

View available mentors

Book sessions based on mentor availability

🧑‍🏫 For Mentors:
Register & login

Set session availability

View & manage student bookings

🧱 Tech Stack
Frontend: ReactJS, Material UI

Backend: NodeJS, ExpressJS

Database: MongoDB (MongoDB Atlas or Local)

Authentication: JWT (JSON Web Tokens)

🏗️ Application Architecture
pgsql
Copy
Edit
/client              --> React frontend
/server              --> Node.js + Express backend
  |-- /models        --> Mongoose schemas (User, Booking)
  |-- /routes        --> API route handlers
  |-- /controllers   --> Business logic for each endpoint
  |-- /middleware    --> Auth middleware (JWT protection)
🛠️ Setup Instructions
✅ Prerequisites:
Node.js & npm installed

MongoDB Atlas account (or local MongoDB)

🖥️ Backend Setup
bash
Copy
Edit
cd server
npm install
🔧 Environment Variables
Create a .env file inside /server:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
▶️ Run the server:
bash
Copy
Edit
npm run dev
🌐 Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start

🔐 Authentication Details
Uses JWT tokens stored in localStorage.

On successful login/registration, the token is stored.

Protected routes use Authorization: Bearer <token> in headers.

Middleware verifies token and decodes user info.

📁 Folder Structure
pgsql
Copy
Edit
/client              --> React frontend
  /pages             --> Login, Register, Bookings, Mentor Dashboard
  /components        --> Navbar, ProtectedRoute, BookingList
  /context           --> AuthContext (global auth state)
/server              --> Node backend
  /models            --> User.js, Booking.js
  /routes            --> auth.js, bookings.js, mentors.js
  /middleware        --> authMiddleware.js
🧪 Seed Data
Mentors can register and manually set availability.

You can also pre-seed data in MongoDB Compass or programmatically if needed.

✅ Core Functionalities Implemented
 Student & Mentor registration/login

 Mentor availability setting

 Student session booking

 Mentor booking management

 Role-based authorization

 JWT auth with protected routes

 Clean & responsive UI with Material UI

📬 Contact
Built with ❤️ by [surendra kambella]
Feel free to reach out at [kambellasurendra@gmail.com] or on LinkedIn.

📎 Submission Notes
Completed within 48-hour timeframe.

Core functionalities prioritized.

App runs error-free with clear instructions.

