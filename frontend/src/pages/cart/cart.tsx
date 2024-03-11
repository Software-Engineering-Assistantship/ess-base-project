import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder } from '../../api/create-order';
import { useCart } from '../../context/cart-context';
import { CartItem } from './cart-item'; 
import Button from '@mui/material/Button';

export function Cart() {
  const { cartItems, handleChangeQuantity, handleCartClear } = useCart();

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

      setTimeout(() => {
        toast.success('Pedido confirmado.');
      }, 1000);
    } catch {
      toast.error('Erro na criação do pedido.');
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} menuItem={item} adminMode={false} categories={[]} refetch={() => {}} />
          ))
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </ul>
      <p>Total: R$ {totalValue.toFixed(2)}</p>
      <Button onClick={handleMakeOrder} disabled={isCreating}>
        {isCreating ? 'Fazendo pedido...' : 'Fazer pedido'}
      </Button>
      <Button onClick={handleCartClear}>Limpar carrinho</Button>
    </div>
  );
}
