import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder } from '../../api/create-order';
import { useCart } from '../../context/cart-context';
import { MenuItem } from '../../components/menu-item'; // Import the MenuItem component

import Button from '@mui/material/Button';

export function Cart() {
  const { cartItems, handleChangeQuantity } = useCart();

  const { mutateAsync: createOrderFn, isPending: isCreating } = useMutation({
    mutationFn: createOrder,
  });

  const totalValue = cartItems.reduce((acc, item) => acc + item.price/100 * item.quantity, 0);

  async function handleMakeOrder() {
    const orderBody = cartItems.map((order) => ({
      snackId: order.id,
      quantity: order.quantity,
    }));

    try {
      await createOrderFn({ orderDetails: orderBody });
      toast.success('Pedido realizado!');
    } catch {
      toast.error('Erro na criação do pedido.');
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.length != 0 ? 
        cartItems.map((item) => (
          <MenuItem key={item.id} menuItem={item} adminMode={false} categories={[]} refetch={() => {}} />
        )) : 
          <p>Seu carrinho está vazio.</p>
      }
      </ul>
      <p>Total: R$ {totalValue.toFixed(2)}</p>
      <Button onClick={handleMakeOrder} disabled={isCreating}>
        {isCreating ? 'Fazendo pedido...' : 'Fazer pedido'}
      </Button>
    </div>
  );
}
