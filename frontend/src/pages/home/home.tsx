import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <Link to="/restaurants">
        <Button variant="contained">Usuario</Button>
      </Link>

      <Link to="/restaurants/admin">
        <Button variant="contained">Admin</Button>
      </Link>
    </div>
  )
}
