import * as React from 'react'
import { Box } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { History, Home, ShoppingCart, Person } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

export default function BottomBar() {
  const [value, setValue] = React.useState(0)
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        backgroundColor: '#fff',
        bottom: 0,
        borderTop: '1px solid #bfbfbf',
        zIndex: 2,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Menu" icon={<Home />} />
        <BottomNavigationAction
          id="order-history"
          label="Order History"
          to="/order-history"
          component={Link}
          icon={<History />}
        />
        <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
        {!isAdmin && (
          <BottomNavigationAction
            label="User"
            icon={<Person />}
            component={Link}
            to="/user"
          />
        )}
      </BottomNavigation>
    </Box>
  )
}
