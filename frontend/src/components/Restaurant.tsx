import { Box, Card, CardActionArea, Typography } from '@mui/material'
import { useState } from 'react'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { Restaurant } from '../api/restaurants'
import { RestaurantsDrawer } from './RestaurantsDrawer'
import { DeleteRestaurantDialog } from './DeleteRestaurantDialog'
import { useNavigate } from 'react-router-dom'

interface RestaurantProps {
  item: Restaurant
  refetch: () => void
}

export const RestaurantItem = ({ item, refetch }: RestaurantProps) => {
  const navigate = useNavigate()
  const isAdmin = location.pathname.includes('admin')
  const [openEditRestaurantDialog, setOpenEditRestaurantDialog] =
    useState(false)
  const [openDeleteRestaurant, setOpenDeleteRestaurantDialog] = useState(false)

  return (
    <Card key={item.id}>
      <CardActionArea
        sx={{
          cursor: 'pointer',
          display: 'flex',
          padding: 2,
          justifyContent: 'space-between',
        }}
      >
        <RestaurantsDrawer
          open={openEditRestaurantDialog}
          handleClose={() => setOpenEditRestaurantDialog(false)}
          refetch={refetch}
          initialValues={item}
          editMode
        />
        <DeleteRestaurantDialog
          key={item.id}
          handleClose={() => setOpenDeleteRestaurantDialog(false)}
          open={openDeleteRestaurant}
          refetch={refetch}
          restaurantId={item.id}
        />
        <Box
          onClick={() =>
            navigate(
              isAdmin
                ? `/restaurants/admin/${item.id}`
                : `/restaurants/${item.id}`,
            )
          }
          width="100%"
        >
          <Typography>{item.name}</Typography>
        </Box>
        {isAdmin && (
          <Box display="flex">
            <Edit
              onClick={() => setOpenEditRestaurantDialog(true)}
              sx={{ cursor: 'pointer', marginRight: 2 }}
            />
            <DeleteOutline
              sx={{
                color: 'red',
              }}
              onClick={() => setOpenDeleteRestaurantDialog(true)}
            />
          </Box>
        )}
      </CardActionArea>
    </Card>
  )
}
