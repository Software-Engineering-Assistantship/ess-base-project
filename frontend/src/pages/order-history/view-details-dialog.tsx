import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { MenuItem } from '../../api/menu'

interface ViewOrderDetailsDialogProps {
  open: boolean
  handleClose: () => void
  menuItems: MenuItem[]
}

export function ViewDetailsDialog({
  open,
  handleClose,
  menuItems,
}: ViewOrderDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} className="details-dialog">
      <DialogTitle>
        <h3 style={{ margin: 0 }}>Itens:</h3>
      </DialogTitle>
      <DialogContent>
        {menuItems.map((item) => (
          <>
            <p style={{ margin: 0.5 }}>{item.title}</p>
            <p style={{ margin: 0.5 }}>{item.description}</p>
            <p style={{ margin: 0.5 }}>
              {(item.price / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p style={{ margin: 0.5 }}>{item.quantity}</p>
            <hr />
          </>
        ))}
      </DialogContent>
    </Dialog>
  )
}
