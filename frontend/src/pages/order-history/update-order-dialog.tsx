import { useMutation } from '@tanstack/react-query'
import { updateOrder } from '../../api/order'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material'
import { useState } from 'react'

interface UpdateOrderDialogProps {
  open: boolean
  handleClose: () => void
  orderId: string
  refetch: () => void
}

export function UpdateOrderDialog({
  open,
  handleClose,
  orderId,
  refetch,
}: UpdateOrderDialogProps) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')

  const { mutateAsync: updateOrderFn, isPending: isUpdating } = useMutation({
    mutationFn: updateOrder,
  })

  async function handleUpdateOrder() {
    try {
      if (!rating) {
        return
      }

      await updateOrderFn({ orderId, rate: rating, comment })
      refetch()
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className="update-order-dialog">
      <DialogTitle>Avaliar pedido</DialogTitle>
      <DialogContent>
        <Rating
          className="rating-order"
          precision={0.5}
          value={rating}
          onChange={(_, value) => setRating(value)}
        />
        <TextField
          className="comment-order"
          sx={{ mt: 2, width: '100%' }}
          value={comment}
          label="Comentário (opcional)"
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          className="submit-rating-button"
          onClick={handleUpdateOrder}
          disabled={isUpdating}
          variant="contained"
        >
          Avaliar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
