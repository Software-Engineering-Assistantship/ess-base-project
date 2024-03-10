import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { History, Home, ShoppingCart } from '@mui/icons-material'

export default function BottomBar() {
  const [value, setValue] = React.useState(0)

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
        <BottomNavigationAction label="Order history" icon={<History />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
      </BottomNavigation>
    </Box>
  )
}
