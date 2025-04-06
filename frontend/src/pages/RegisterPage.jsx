import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Typography, MenuItem } from '@mui/material';

const RegisterPage = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'mentor'
  const [expertise, setExpertise] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role, expertise); // ✅ HERE
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <Typography variant="h5">Register</Typography>
      <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField
        label="Role"
        select
        fullWidth
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="mentor">Mentor</MenuItem>
      </TextField>
      {role === 'mentor' && (
        <TextField
          label="Expertise"
          fullWidth
          margin="normal"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
