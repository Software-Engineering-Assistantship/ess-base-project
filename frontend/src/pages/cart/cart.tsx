import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder } from '../../api/create-order';
import { useCart } from '../../context/cart-context';
import { CartItem } from './cart-item'; 

import Button from '@mui/material/Button';

{/* <Button onClick={() => handleChangeQuantity(menuItem.id, 'minus')}>-</Button>
<span>{menuItem.quantity}</span>
<Button onClick={() => handleChangeQuantity(menuItem.id, 'plus')}>+</Button>
</div> */}
export function Cart() {
  const { cartItems, handleChangeQuantity, handleCartClear } = useCart(); // Add handleCartClear from useCart hook

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
        {cartItems.length !== 0 ? ( // Render cart items if cart is not empty
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
      <Button onClick={handleCartClear}>Limpar carrinho</Button> {/* Clear cart button */}
    </div>
  );
}
