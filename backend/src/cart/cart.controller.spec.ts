// import { describe, it, expect, beforeAll } from 'vitest';
// import { CartController } from '../cart/controllers/cart.controller';
// import { InMemoryCartService } from '../../test/services/in-memory-cart-service';
// import { CreateMenuItemSchema } from '../menu/dto/create-menu-item';
// import { UpdateMenuItemSchema } from '../menu/dto/update-menu-item';
// import { CartDto } from '../cart/dto/cart.dto';
// import { MenuItem } from '../menu/entities/menu-item';
// import { NotFoundException } from '@nestjs/common';

// describe('CartController', () => {
//   let controller: CartController;
//   let cartService: InMemoryCartService;

//   beforeAll(async () => {
//     const mockCartService = {
//       getCartById: async (id: string) => Promise.resolve(),
//       getCartItemById: async (id: string, itemId: string) => Promise.resolve(),
//       updateCartItem: async (
//         id: string,
//         itemId: string,
//         updatedItem: UpdateMenuItemSchema,
//       ) => Promise.resolve(),
//       deleteCartItem: async (id: string, itemId: string) => Promise.resolve(),
//       addItemToCart: async (id: string, newItem: CreateMenuItemSchema) =>
//         Promise.resolve(),
//     };

//     controller = new CartController(mockCartService as any);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('getCartById', () => {
//     it('should return a cart by id', async () => {
//       const cartId = '1';
//       const expectedCart: CartDto = {
//         id: '1',
//         items: [
//           {
//             id: '1',
//             title: 'Product 1',
//             description: 'Description of product 1',
//             price: 10.99,
//             quantity: 2,
//             categoryId: '1',
//           },
//           {
//             id: '2',
//             title: 'Product 2',
//             description: 'Description of product 2',
//             price: 15.99,
//             quantity: 1,
//             categoryId: '2',
//           },
//         ],
//         totalSum: 37.97,
//       };
//       const spyGetCartById = jest
//         .spyOn(cartService, 'getCartById')
//         .mockResolvedValue(expectedCart);

//       const result = await controller.getCartById(cartId);

//       expect(result).toEqual(expectedCart);
//       expect(spyGetCartById).toHaveBeenCalledWith(cartId);
//     });

//     it('should throw NotFoundException if cart is not found', async () => {
//       const cartId = 'nonexistent';
//       jest
//         .spyOn(cartService, 'getCartById')
//         .mockRejectedValue(new NotFoundException());

//       await expect(controller.getCartById(cartId)).rejects.toThrowError(
//         NotFoundException,
//       );
//     });
//   });

//   describe('addItemToCart', () => {
//     it('should add item to cart', async () => {
//       const cartId = '1';
//       const mockCreateMenuItem: CreateMenuItemSchema = {
//         title: 'Product 1',
//         description: 'Description of product 1',
//         price: 10.99,
//         quantity: 2,
//         categoryId: '1',
//       };

//       const updatedCart = await controller.addItemToCart(
//         cartId,
//         mockCreateMenuItem,
//       );

//       const addedItem = updatedCart[0];

//       expect(addedItem).toHaveProperty('id');
//       expect(typeof addedItem.id).toBe('string');

//       expect(addedItem).toHaveProperty('title');
//       expect(typeof addedItem.title).toBe('string');

//       expect(addedItem).toHaveProperty('description');
//       expect(typeof addedItem.description).toBe('string');

//       expect(addedItem).toHaveProperty('quantity');
//       expect(typeof addedItem.quantity).toBe('number');

//       expect(addedItem).toHaveProperty('categoryId');
//       expect(typeof addedItem.categoryId).toBe('string');
//     });
//   });
// });
