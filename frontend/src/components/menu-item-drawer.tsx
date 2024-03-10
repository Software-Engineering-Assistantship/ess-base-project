import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Category, MenuItem, MenuItemBody } from '../api/menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const menuItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string().transform((price) => Number(price)),
  quantity: z.string().transform((quantity) => Number(quantity)),
})

type MenuItemSchema = z.infer<typeof menuItemSchema>

interface MenuItemDialogProps {
  open: boolean
  handleClose: () => void
  handleMenuItemAction: (menuItem: MenuItemBody) => void
  refetch: () => void
  categoriesOptions: Category[]
  isLoading: boolean
  initialValues?: MenuItem
  editMode?: boolean
}

export function MenuItemDrawer({
  open,
  handleClose,
  categoriesOptions,
  handleMenuItemAction,
  refetch,
  isLoading,
  initialValues,
  editMode,
}: MenuItemDialogProps) {
  const parsedCategories = categoriesOptions.map((category) => ({
    label: category.name,
    value: category.id,
  }))

  const [category, setCategory] = useState(
    parsedCategories.find((item) => initialValues?.categoryId === item.value),
  )

  const { register, handleSubmit } = useForm<MenuItemSchema>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      title: initialValues?.title,
      description: initialValues?.description,
      price: initialValues?.price && initialValues?.price / 100,
      quantity: initialValues?.quantity,
    },
  })

  async function handleSubmitMenuItem(data: MenuItemSchema) {
    try {
      if (!category?.value) {
        return
      }

      const menuItemBody: MenuItemBody = {
        ...data,
        price: data.price * 100,
        categoryId: category?.value,
      }

      if (initialValues?.id) {
        menuItemBody.id = initialValues.id
      }

      await handleMenuItemAction(menuItemBody)

      refetch()
      handleClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={handleClose}>
      <Box sx={{ px: 1, mb: 2 }}>
        <form onSubmit={handleSubmit(handleSubmitMenuItem)}>
          <h3>{editMode ? 'Update product' : 'Add new product'}</h3>
          <TextField
            variant="outlined"
            label="Product name"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('title')}
          />
          <TextField
            variant="outlined"
            label="Description"
            sx={{ width: '100%', mt: 1, mb: 1 }}
            {...register('description')}
          />

          <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput id="price" label="Price" {...register('price')} />
          </FormControl>

          <FormControl sx={{ width: '100%', mt: 1, mb: 1 }}>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <OutlinedInput
              id="quantity"
              label="Quantity"
              type="number"
              {...register('quantity')}
            />
          </FormControl>

          <Autocomplete
            disablePortal
            defaultValue={category}
            onChange={(_, value) => {
              setCategory(value!)
            }}
            options={parsedCategories}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />

          {editMode ? (
            <Button
              variant="contained"
              sx={{ width: '100%', mt: 5 }}
              type="submit"
              disabled={isLoading}
            >
              Update item
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: '100%', mt: 5 }}
              type="submit"
              disabled={isLoading}
            >
              Create item
            </Button>
          )}
        </form>
      </Box>
    </Drawer>
  )
}
