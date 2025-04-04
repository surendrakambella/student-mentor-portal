import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MentorsPage from './pages/MentorsPage';
import BookingsPage from './pages/BookingsPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/mentors" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mentors" element={
          <PrivateRoute>
            <MentorsPage />
          </PrivateRoute>
        } />
        <Route path="/bookings" element={
          <PrivateRoute>
            <BookingsPage />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;