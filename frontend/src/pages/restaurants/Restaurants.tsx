import { useQuery } from '@tanstack/react-query'
import { getRestaurants } from '../../api/restaurants'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { RestaurantsDrawer } from '../../components/RestaurantsDrawer'
import { useState } from 'react'
import { RestaurantItem } from '../../components/Restaurant'

export const Restaurants = () => {
  const isAdmin = location.pathname.includes('admin')
  const [openRestaurantDialog, setOpenRestaurantDialog] = useState(false)

  const {
    data: result,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getRestaurants(),
  })

  return (
    <>
      {result && (
        <>
          <RestaurantsDrawer
            open={openRestaurantDialog}
            handleClose={() => setOpenRestaurantDialog(false)}
            refetch={refetch}
            isLoading={isFetching}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h5" marginRight={1}>
              Restaurantes
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                sx={{ width: '200px' }}
                onClick={() => setOpenRestaurantDialog(true)}
              >
                Criar restaurante
              </Button>
            )}
          </Box>
          <Divider />
          <Stack spacing={2} marginTop={1}>
            {result.map((restaurant) => (
              <RestaurantItem
                item={restaurant}
                refetch={refetch}
                key={restaurant.id}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  )
}
