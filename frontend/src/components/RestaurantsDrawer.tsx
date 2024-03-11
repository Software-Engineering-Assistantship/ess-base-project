import { Box, Button, Drawer, FormControl, TextField } from '@mui/material'
import {
  Restaurant,
  createRestaurant,
  updateRestaurant,
} from '../api/restaurants'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { TimePicker } from '@mui/x-date-pickers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

interface RestaurantsDrawerProps {
  open: boolean
  handleClose: () => void
  refetch: () => void
  isLoading?: boolean
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
  refetch,
  initialValues,
  editMode,
}: RestaurantsDrawerProps) {
  const initialTime = editMode
    ? new Date(initialValues?.closingTime || new Date())
    : null
  const [selectedTime, setSelectedTime] = useState<Date | null>(initialTime)

  const { mutateAsync: createRestaurantFn } = useMutation({
    mutationKey: ['restaurants'],
    mutationFn: createRestaurant,
  })

  const { mutateAsync: updateRestaurantFn } = useMutation({
    mutationKey: ['restaurants'],
    mutationFn: updateRestaurant,
  })

  const { register, handleSubmit, setValue, reset } = useForm<RestaurantSchema>(
    {
      resolver: zodResolver(restaurantSchema),
      defaultValues: {
        ...initialValues,
        closingTime: initialTime ?? undefined,
      },
    },
  )

  async function handleSubmitRestaurant(data: RestaurantSchema) {
    await createRestaurantFn(data)
    handleClose()
    refetch()
    reset()
    setSelectedTime(null)
  }

  async function handleEditRestaurant(data: RestaurantSchema) {
    const payload = { ...data, id: initialValues?.id }
    await updateRestaurantFn(payload)
    handleClose()
    refetch()
    reset(data)
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <Box sx={{ px: 1, mb: 2 }}>
        <form
          onSubmit={handleSubmit(
            editMode ? handleEditRestaurant : handleSubmitRestaurant,
          )}
        >
          <h3>{editMode ? 'Atualizar Restaurante' : 'Criar Restaurante'}</h3>
          <TextField
            variant="outlined"
            label="Nome"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('name')}
          />
          <TextField
            variant="outlined"
            label="Endereço"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('address')}
          />
          <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
            <TimePicker
              ampm={false}
              sx={{ width: '100%', mt: 1, mb: 1 }}
              label="Horário de fechamento"
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
              label="Tipo"
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
              Atualizar restaurante
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: '100%', mt: 5 }}
              type="submit"
            >
              Criar restaurante
            </Button>
          )}
        </form>
      </Box>
    </Drawer>
  )
}
