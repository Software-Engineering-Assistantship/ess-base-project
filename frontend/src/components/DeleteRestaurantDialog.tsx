import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'
import { deleteRestaurant } from '../api/restaurants'
import { useMutation } from '@tanstack/react-query'

interface DeleteRestaurantDialogProps {
  open: boolean
  restaurantId: string
  handleClose: () => void
  refetch: () => void
}

export function DeleteRestaurantDialog({
  open,
  handleClose,
  restaurantId,
  refetch,
}: DeleteRestaurantDialogProps) {
  const { mutateAsync: deleteRestaurantFn } = useMutation({
    mutationFn: deleteRestaurant,
  })

  const handleDeleteRestaurant = async () => {
    try {
      await deleteRestaurantFn(restaurantId)

      refetch()
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        Deletar esse restaurante?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja deletar esse restaurante? Essa ação é
          irreversível
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleDeleteRestaurant}>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
