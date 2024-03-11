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

  async function handleMakeOrder() {
    const orderBody = cartItems.map((order) => ({
      snackId: order.id,
      quantity: order.quantity,
    }));

    try {
      await createOrderFn({ orderDetails: orderBody });
      toast.success('Order created successfully!');
    } catch {
      toast.error('Error when ordering the items.');
    }
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <MenuItem key={item.id} menuItem={item} adminMode={false} categories={[]} refetch={() => {}} />
        ))}
      </ul>
      <Button onClick={handleMakeOrder} disabled={isCreating}>
        {isCreating ? 'Creating Order...' : 'Place Order'}
      </Button>
    </div>
  );
}
