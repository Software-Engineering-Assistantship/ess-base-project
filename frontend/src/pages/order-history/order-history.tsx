import { Box, Paper, Button, Rating } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  OrderBody,
  createOrder,
  deleteOrder,
  getAllOrders,
} from '../../api/order'
import { format } from 'date-fns'
import { DeleteOutline } from '@mui/icons-material'
import { useState } from 'react'
import { UpdateOrderDialog } from './update-order-dialog'
import { MenuItem } from '../../api/menu'
import { ViewDetailsDialog } from './view-details-dialog'

export function OrderHistory() {
  const [openUpdateOrderDialog, setOpenUpdateOrderDialog] = useState(false)
  const [openViewOrderDetailsDialog, setOpenViewOrderDetailsDialog] =
    useState(false)
  const [orderId, setOrderId] = useState('')
  const [orderDetails, setOrderDetails] = useState<MenuItem[]>([])

  const { data: result, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
  })

  const { mutateAsync: createOrderFn, isPending: isCreating } = useMutation({
    mutationFn: createOrder,
  })

  const { mutateAsync: deleteOrderFn } = useMutation({
    mutationFn: deleteOrder,
  })

  async function handleCreateOrder({ menuItems }: OrderBody) {
    try {
      await createOrderFn({ menuItems })
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteOrder(orderId: string) {
    try {
      await deleteOrderFn({ orderId })
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  function handleCloseUpdateOrderDialog() {
    setOpenUpdateOrderDialog(false)
  }

  function handleOpenUpdateOrderDialog() {
    setOpenUpdateOrderDialog(true)
  }

  function handleCloseViewOrderDetailsDialog() {
    setOpenViewOrderDetailsDialog(false)
  }

  function handleOpenViewOrderDetailsDialog() {
    setOpenViewOrderDetailsDialog(true)
  }

  return (
    <>
      <UpdateOrderDialog
        open={openUpdateOrderDialog}
        handleClose={handleCloseUpdateOrderDialog}
        orderId={orderId}
        refetch={refetch}
      />
      <ViewDetailsDialog
        open={openViewOrderDetailsDialog}
        handleClose={handleCloseViewOrderDetailsDialog}
        menuItems={orderDetails}
      />
      <h2 style={{ marginLeft: 10 }}>Histórico de pedidos</h2>
      {result && (
        <div>
          {result.map((order) => {
            const menuInformationArray = order.menuItems.map(
              (item) => item.menu,
            )

            return (
              <Paper
                key={order.id}
                className="order-card"
                sx={{
                  mb: 5,
                  height: 150,
                  mx: 1,
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <span>Pedido no dia: </span>
                    <span style={{ opacity: 0.6 }}>
                      {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                    </span>
                  </Box>
                  <DeleteOutline
                    className="delete-order-button"
                    sx={{ color: 'red', opacity: 0.7, cursor: 'pointer' }}
                    onClick={() => {
                      handleDeleteOrder(order.id)
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Rating value={order.rate} readOnly precision={0.5} />
                  <p style={{ margin: 0 }}>
                    Comentário: {order.comment ? order.comment : 'Nenhum'}
                  </p>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    mt: 1,
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ flexGrow: 1 }}
                    disabled={isCreating}
                    onClick={() =>
                      handleCreateOrder({ menuItems: menuInformationArray })
                    }
                  >
                    Repetir
                  </Button>
                  <Button
                    variant="contained"
                    className="view-details-button"
                    sx={{ flexGrow: 1 }}
                    onClick={() => {
                      setOrderDetails(menuInformationArray)
                      handleOpenViewOrderDetailsDialog()
                    }}
                  >
                    Ver detalhes
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ flexGrow: 1 }}
                    onClick={() => {
                      setOrderId(order.id)
                      handleOpenUpdateOrderDialog()
                    }}
                  >
                    Avaliar
                  </Button>
                </Box>
              </Paper>
            )
          })}
        </div>
      )}
    </>
  )
}
