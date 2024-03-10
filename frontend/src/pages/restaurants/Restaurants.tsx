import { useQuery } from '@tanstack/react-query'
import { Restaurant, getRestaurants } from '../../api/restaurants'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { RestaurantsDrawer } from '../../components/RestaurantsDrawer'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Restaurants = () => {
  const isAdmin = location.pathname.includes('admin')
  const [openMenuDialog, setOpenMenuDialog] = useState(false)
  const { data: result } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getRestaurants(),
  })

  const renderItem = (item: Restaurant) => {
    return (
      <Link
        to={
          isAdmin ? `/restaurants/admin/${item.id}` : `/restaurants/${item.id}`
        }
      >
        <Card style={{ cursor: 'pointer' }}>
          <Typography>{item.name}</Typography>
        </Card>
      </Link>
    )
  }

  return (
    <>
      {result && (
        <>
          <RestaurantsDrawer
            open={openMenuDialog}
            handleClose={() => setOpenMenuDialog(false)}
          />
          <Box
            sx={{
              display: 'flex',
              marginBottom: '1rem',
            }}
          >
            {isAdmin && (
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => setOpenMenuDialog(true)}
              >
                Create new restaurant
              </Button>
            )}
          </Box>
          <Stack spacing={2}>
            {result.map((restaurant) => renderItem(restaurant))}
          </Stack>
        </>
      )}
    </>
  )
}
