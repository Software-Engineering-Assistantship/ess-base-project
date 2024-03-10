import { useQuery } from '@tanstack/react-query'
import { Restaurant, getRestaurants } from '../../api/restaurants'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { RestaurantsDrawer } from '../../components/RestaurantsDrawer'
import { useState } from 'react'

export const Restaurants = () => {
  const isAdmin = location.pathname.includes('admin')
  const [openMenuDialog, setOpenMenuDialog] = useState(false)
  const { data: result } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getRestaurants(),
  })

  const renderItem = (item: Restaurant) => {
    return (
      <Card>
        <Typography>{item.name}</Typography>
      </Card>
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
