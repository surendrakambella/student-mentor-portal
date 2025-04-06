import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const register = async (name, email, password, role, expertise) => {
    const res = await axios.post('/api/auth/register', {
      name,
      email,
      password,
      role,
      expertise,
    });

    const { user, token } = res.data;
    login(user, token); // auto-login after registration
    navigate('/'); // redirect after successful registration
  };

  const performLogin = async (email, password) => {
    const res = await axios.post('/api/auth/login', {
      email,
      password,
    });

    const { user, token } = res.data;
    login(user, token); // auto-login after login
    navigate('/'); // redirect after successful login
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register, performLogin }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
