import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'

interface DeleteMenuItemDialogProps {
  open: boolean
  handleClose: () => void
}

export function DeleteMenuItemDialog({
  open,
  handleClose,
}: DeleteMenuItemDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Delete menu item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item? This is irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
