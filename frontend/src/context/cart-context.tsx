import { createContext, ReactNode, useContext, useState, useEffect} from 'react'

interface CartItem {
  id: string
  title: string
  description: string
  price: number
  categoryId: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  handleCartAddItem: (item: CartItem) => void
  handleCartRemoveItem: (itemId: string) => void
  handleChangeQuantity: (itemId: string, operation: string) => void
  handleCartClear: () => void
}

export const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function handleCartAddItem(item: CartItem) {
    console.log("Item added to cart:", item);
    setCartItems((prevState) => [...prevState, item])
  }

  function handleCartRemoveItem(itemId: string) {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  function handleCartClear() {
    setCartItems([]); 
  }

  function handleChangeQuantity(itemId: string, operation: string) {
    const foundIngredient = cartItems.find((item) => item.id === itemId)

    if (!foundIngredient) {
      return cartItems
    }

    const updatedIngredients = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const currentQuantity = item.quantity
          if (operation === 'minus' && currentQuantity > 0) {
            return { ...item, quantity: currentQuantity - 1 }
          } else if (operation === 'plus') {
            return { ...item, quantity: currentQuantity + 1 }
          }
        }
        return item
      })
      .filter((item) => item.quantity > 0)

    setCartItems(updatedIngredients)
  }

  console.log("itens:" + cartItems)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleCartAddItem,
        handleCartRemoveItem,
        handleChangeQuantity,
        handleCartClear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)