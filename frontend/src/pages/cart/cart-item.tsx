import { DeleteOutline, Edit } from '@mui/icons-material';
import { Category, MenuItem as MenuItemType } from '../../api/menu';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useCart } from '../../context/cart-context';

const Card = styled.div`
  border-top: 1px solid #bfbfbf;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 200px;

  h2 {
    font-weight: 500;
  }

  span {
    color: #008000;
  }

  p {
    color: #8c8c8c;
  }

  &:hover {
    background-color: #f2f2f2df;
    cursor: pointer;
  }

  transition: background-color 0.3s;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LimitReachedText = styled(Typography)`
  color: red;
`;

interface CartItemProps {
  menuItem: MenuItemType;
  adminMode: boolean;
  categories: Category[];
  refetch: () => void;
}

export function CartItem({ menuItem, adminMode, categories, refetch }: CartItemProps) {
  const { handleCartRemoveItem, handleChangeQuantity } = useCart();

  return (
    <Card>
      <div>
        <h4>{menuItem.title}</h4>
        <p>{menuItem.description}</p>
        <span>{(menuItem.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
      <QuantityWrapper data-test='quantityWrapper'>
        <Button onClick={() => handleChangeQuantity(menuItem.id, 'minus')}>-</Button>
        <span>{menuItem.quantity}</span>
        {menuItem.quantity >= 10 && <LimitReachedText>Limite atingido</LimitReachedText>}
        <Button onClick={() => handleChangeQuantity(menuItem.id, 'plus')} disabled={menuItem.quantity >= 10}>+</Button>
      </QuantityWrapper>
    </Card>
  );
}
