import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'
import { useState } from 'react'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { Restaurant } from '../api/restaurants'
import { RestaurantsDrawer } from './RestaurantsDrawer'
import { DeleteRestaurantDialog } from './DeleteRestaurantDialog'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import RestaurantIcon from '@mui/icons-material/Restaurant'

// https://img.freepik.com/vetores-premium/logotipo-do-design-de-alimentos-de-qualidade-para-catering_187482-593.jpg

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
        <Avatar
          sx={{ width: 70, height: 70, marginRight: 2 }}
          src={item.picture || undefined}
        >
          <RestaurantIcon />
        </Avatar>
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
          <Typography fontWeight="bold">
            {item.name} - {item.address}
          </Typography>
          <Typography variant="subtitle1">
            {item.type} - Funcionando até{' '}
            {format(new Date(item.closingTime), 'HH:mm')}
          </Typography>
        </Box>
        {isAdmin && (
          <Box display="flex">
            <Edit
              onClick={() => setOpenEditRestaurantDialog(true)}
              sx={{ cursor: 'pointer', marginRight: 2 }}
              aria-label="edit-restaurant"
            />
            <DeleteOutline
              sx={{
                color: 'red',
              }}
              onClick={() => setOpenDeleteRestaurantDialog(true)}
              aria-label="delete-restaurant"
            />
          </Box>
        )}
      </CardActionArea>
    </Card>
  )
}
