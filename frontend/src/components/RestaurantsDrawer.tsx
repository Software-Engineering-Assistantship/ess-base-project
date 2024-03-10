import { Box, Button, Drawer, FormControl, TextField } from '@mui/material'
import { Restaurant, createRestaurant } from '../api/restaurants'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { TimePicker } from '@mui/x-date-pickers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
// import { useMutation } from '@tanstack/react-query'

interface RestaurantsDrawerProps {
  open: boolean
  handleClose: () => void
  initialValues?: Restaurant
  editMode?: boolean
}

const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  closingTime: z.date(),
  type: z.string(),
})

type RestaurantSchema = z.infer<typeof restaurantSchema>

export function RestaurantsDrawer({
  open,
  handleClose,
  initialValues,
  editMode,
}: RestaurantsDrawerProps) {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)

  const { register, handleSubmit, setValue } = useForm<RestaurantSchema>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: initialValues,
  })

  async function handleSubmitMenuItem(data: RestaurantSchema) {
    await createRestaurant(data)
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <Box sx={{ px: 1, mb: 2 }}>
        <form onSubmit={handleSubmit(handleSubmitMenuItem)}>
          <h3>{editMode ? 'Update Restaurant' : 'Create Restaurant'}</h3>
          <TextField
            variant="outlined"
            label="Name"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('name')}
          />
          <TextField
            variant="outlined"
            label="Address"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('address')}
          />
          <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
            <TimePicker
              ampm={false}
              sx={{ width: '100%', mt: 1, mb: 1 }}
              label="Closing Time"
              value={selectedTime}
              timezone="UTC"
              onChange={(value) => {
                setSelectedTime(value)
                if (value) {
                  setValue('closingTime', value)
                }
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
            <TextField
              variant="outlined"
              label="Type"
              sx={{ width: '100%', mt: 1, mb: 1 }}
              {...register('type')}
            />
          </FormControl>
          {editMode ? (
            <Button
              variant="contained"
              sx={{ width: '100%', mt: 5 }}
              type="submit"
            >
              Update restaurant
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: '100%', mt: 5 }}
              type="submit"
            >
              Create restaurant
            </Button>
          )}
        </form>
      </Box>
    </Drawer>
  )
}
