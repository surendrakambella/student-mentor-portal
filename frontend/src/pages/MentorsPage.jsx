import { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: dayjs().format('YYYY-MM-DD'),
    time: '10:00'
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get('/api/mentors');
        setMentors(res.data);
      } catch (err) {
        setError('Failed to load mentors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Handle booking submission
  const handleBookSession = async () => {
    setBookingLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('/api/bookings', {
        mentorId: selectedMentor._id,
        date: bookingData.date,
        time: bookingData.time
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setSuccess('Session booked successfully!');
      setTimeout(() => {
        setSelectedMentor(null);
        navigate('/bookings');
      }, 1500);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         'Failed to book session. Please try again.';
      setError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Available Mentors</Typography>
      
      {/* Error/Success Alerts */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      {/* Mentors List */}
      <List>
        {mentors.map(mentor => (
          <ListItem key={mentor._id}>
            <ListItemText 
              primary={mentor.name}
              secondary={
                <>
                  <div>Email: {mentor.email}</div>
                  {mentor.expertise && <div>Expertise: {mentor.expertise}</div>}
                  {mentor.availability && (
                    <div>Availability: {mentor.availability.join(', ')}</div>
                  )}
                </>
              }
            />
            {user?.role === 'student' && (
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setSelectedMentor(mentor)}
                disabled={bookingLoading}
              >
                Book Session
              </Button>
            )}
          </ListItem>
        ))}
      </List>

      {/* Booking Dialog */}
      <Dialog 
        open={!!selectedMentor} 
        onClose={() => !bookingLoading && setSelectedMentor(null)}
      >
        <DialogTitle>
          Book Session with {selectedMentor?.name}
        </DialogTitle>
        
        <DialogContent>
          <TextField
            margin="normal"
            label="Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={bookingData.date}
            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
            inputProps={{ 
              min: new Date().toISOString().split('T')[0] 
            }}
          />
          <TextField
            margin="normal"
            label="Time"
            type="time"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={bookingData.time}
            onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
          />
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={() => setSelectedMentor(null)} 
            disabled={bookingLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBookSession}
            color="primary"
            variant="contained"
            disabled={bookingLoading || !bookingData.date || !bookingData.time}
          >
            {bookingLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MentorsPage;