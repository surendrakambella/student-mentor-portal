# student-mentor-portal
📘 Student-Mentor Portal
A full-stack web application that allows students to book sessions with mentors. Built using MongoDB, Express.js, ReactJS, and NodeJS (MERN stack).

# 🚀 Features
👩‍🎓 For Students:
Register & login

View available mentors

Book sessions based on mentor availability

# 🧑‍🏫 For Mentors:
Register & login

Set session availability

View & manage student bookings

# 🧱 Tech Stack
Frontend: ReactJS, Material UI

Backend: NodeJS, ExpressJS

Database: MongoDB (MongoDB Atlas or Local)

Authentication: JWT (JSON Web Tokens)

# 🏗️ Application Architecture
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

# 🖥️ Backend Setup
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
# 🌐 Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start

# 🔐 Authentication Details
Uses JWT tokens stored in localStorage.

On successful login/registration, the token is stored.

Protected routes use Authorization: Bearer <token> in headers.

Middleware verifies token and decodes user info.

# 📁 Folder Structure
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

# ✅ Core Functionalities Implemented
 Student & Mentor registration/login

 Mentor availability setting

 Student session booking

 Mentor booking management

 Role-based authorization

 JWT auth with protected routes

 Clean & responsive UI with Material UI
 


# 📬 Contact
Built with ❤️ by [surendra kambella]
Feel free to reach out at [kambellasurendra@gmail.com] or on LinkedIn.

# Screenshots
![Vite + React - Google Chrome 06-04-2025 09_46_40](https://github.com/user-attachments/assets/85e10e3e-97ba-4465-a173-a86cc14de72c)
![Vite + React - Google Chrome 06-04-2025 09_47_35](https://github.com/user-attachments/assets/17094c5d-9f8a-4028-926c-dd5fb66cd7ee)
![Vite + React - Google Chrome 06-04-2025 15_06_16](https://github.com/user-attachments/assets/86f8f1fa-5c76-47bf-b87e-7043596eebc9)
![http___localhost_5000_api_auth_register - surendra kambella's Workspace 06-04-2025 11_24_42](https://github.com/user-attachments/assets/d2c34a31-8bb7-43e1-b91b-16901e350729)
![bookings js - student-mentor-portal - Visual Studio Code 06-04-2025 10_03_57](https://github.com/user-attachments/assets/686d155c-b844-4881-8304-cbdcdd6d1e02)
![surendrakambella_student-mentor-portal - mongdob ](https://github.com/user-attachments/assets/8ba38721-c831-4be6-9c38-563972d65aad)






📎 Submission Notes
Completed within 48-hour timeframe.

Core functionalities prioritized.

App runs error-free with clear instructions.

