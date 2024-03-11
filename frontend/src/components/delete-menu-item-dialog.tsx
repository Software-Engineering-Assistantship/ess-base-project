import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'
import { deleteMenuItem } from '../api/menu'
import { useMutation } from '@tanstack/react-query'

interface DeleteMenuItemDialogProps {
  open: boolean
  handleClose: () => void
  menuItemId: string
  refetch: () => void
}

export function DeleteMenuItemDialog({
  open,
  handleClose,
  menuItemId,
  refetch,
}: DeleteMenuItemDialogProps) {
  const { mutateAsync: deleteMenuItemFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteMenuItem,
  })

  async function handleDeleteMenuItem() {
    try {
      await deleteMenuItemFn(menuItemId)

      refetch()
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className="delete-item-dialog">
      <DialogTitle id="alert-dialog-title">Deletar esse item?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja deletar esse item? Isso é irreversível
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          className="delete-item-button"
          variant="contained"
          onClick={handleDeleteMenuItem}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
