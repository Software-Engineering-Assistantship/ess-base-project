import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  Category,
  MenuItem as MenuItemType,
  updateMenuItem,
  MenuItemBody,
} from '../api/menu';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { MenuItemDrawer } from './menu-item-drawer';
import { useState } from 'react';
import { DeleteMenuItemDialog } from './delete-menu-item-dialog';
import { useCart } from '../context/cart-context';

const Card = styled.div`
  border-top: 1px solid #bfbfbf;
  /* border-bottom: 1px solid #bfbfbf; */
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

interface MenuItemProps {
  menuItem: MenuItemType;
  adminMode: boolean;
  categories: Category[];
  refetch: () => void;
  inCart?: boolean; // New prop to indicate if MenuItem is in the cart
}

export function MenuItem({
  menuItem,
  adminMode,
  categories,
  refetch,
  inCart = false, // Default value is false
}: MenuItemProps) {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);

  const { mutateAsync: updateMenuItemFn, isPending: isUpdating } = useMutation({
    mutationFn: updateMenuItem,
  });

  function handleCloseMenuDialog() {
    setOpenMenuDrawer(false);
  }

  function handleOpenMenuDialog() {
    setOpenMenuDrawer(true);
  }

  function handleCloseDeleteMenuDialog() {
    setOpenDeleteMenuDialog(false);
  }

  function handleOpenDeleteMenuDialog() {
    setOpenDeleteMenuDialog(true);
  }

  async function handleUpdateMenuItem(menuItem: MenuItemBody) {
    await updateMenuItemFn(menuItem);
  }

  const { cartItems, handleCartAddItem, handleCartRemoveItem, handleChangeQuantity } = useCart();

  const isItemInCart = cartItems && cartItems.some((item) => item.id === menuItem.id);

  return (
    <>
      <MenuItemDrawer
        open={openMenuDrawer}
        handleClose={handleCloseMenuDialog}
        categoriesOptions={categories}
        handleMenuItemAction={handleUpdateMenuItem}
        refetch={refetch}
        isLoading={isUpdating}
        initialValues={menuItem}
        editMode
      />
      <DeleteMenuItemDialog
        open={openDeleteMenuDialog}
        handleClose={handleCloseDeleteMenuDialog}
        menuItemId={menuItem.id}
        refetch={refetch}
      />
      <Card className="Card">
        <div>
          <h4>{menuItem.title}</h4>
          <p>{menuItem.description}</p>
          <span>
            {(menuItem.price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        {adminMode ? (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              marginRight: 2,
            }}
          >
            <Edit
              onClick={handleOpenMenuDialog}
              sx={{ cursor: 'pointer' }}
              data-testid="edit-icon"
            />
            <DeleteOutline
              sx={{
                color: 'red',
              }}
              onClick={handleOpenDeleteMenuDialog}
              data-testid="delete-icon"
            />
          </Box>
        ) : isItemInCart ?  (
        <Button className="RemoverItem" 
        onClick={() => handleCartRemoveItem(menuItem.id)}>
        Remove from cart
      </Button>)
      : (
          <Button
            className="AddItem"
            onClick={() =>
              handleCartAddItem({
                id: menuItem.id,
                title: menuItem.title,
                quantity: 1,
                description: menuItem.description,
                price: menuItem.price,
                categoryId: menuItem.categoryId
              })
            }
          >
            Add to cart
          </Button>
        )
          }
      </Card>
    </>
  );
}
