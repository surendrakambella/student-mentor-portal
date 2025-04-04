const register = async (name, email, password, role, expertise) => {
  try {
    const res = await axios.post('/api/auth/register', { 
      name, 
      email, 
      password, 
      role,
      expertise: role === 'mentor' ? expertise : undefined
    });
    
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigate(role === 'mentor' ? '/bookings' : '/mentors');
  } catch (error) {
    throw error;
  }
};