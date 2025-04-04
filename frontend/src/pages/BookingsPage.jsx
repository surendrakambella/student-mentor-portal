import { useState, useEffect } from 'react'
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Button,
  CircularProgress
} from '@mui/material'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/api/bookings/my-bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setBookings(res.data)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setBookings(bookings.filter(b => b._id !== bookingId))
      alert('Booking cancelled successfully')
    } catch (err) {
      alert('Failed to cancel booking: ' + (err.response?.data?.message || err.message))
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        {user?.role === 'mentor' ? 'Your Sessions' : 'Your Bookings'}
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings found</Typography>
      ) : (
        <List>
          {bookings.map(booking => (
            <ListItem key={booking._id}>
              <ListItemText
                primary={user?.role === 'mentor' ? booking.student?.name : booking.mentor?.name}
                secondary={`Date: ${new Date(booking.date).toLocaleDateString()} | Time: ${booking.time}`}
              />
              <Button 
                variant="contained" 
                color="error"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default BookingsPage