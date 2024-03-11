import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder } from '../../api/order';
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
    const menuItems = cartItems.map((order) => ({
      id: order.id,
      title: order.title,
			description: order.description,
			price: order.price,
			quantity: order.quantity,
			categoryId: order.categoryId
    }));

    try {
      await createOrderFn({ menuItems });

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
      { !isCreating ? (<p>Pedido feito</p>) : (<></>)}
      <ul data-test="cart-list">
        {cartItems.length !== 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} menuItem={item} adminMode={false} categories={[]} refetch={() => {}} data-test={item.id} />
          ))
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </ul>
      <p>Total: R$ {totalValue.toFixed(2)}</p>
      <Button onClick={handleMakeOrder} disabled={isCreating}>
        {isCreating ? 'Fazendo pedido...' : 'Fazer pedido'}
      </Button>
      <Button className="Limpar" onClick={handleCartClear}>Limpar carrinho</Button>
    </div>
  );
}
