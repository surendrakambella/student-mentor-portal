import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mentor Portal
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/mentors">
              Mentors
            </Button>
            <Button color="inherit" component={Link} to="/bookings">
              Bookings
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar