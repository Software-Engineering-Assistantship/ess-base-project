// import { describe, it, expect, beforeAll } from 'vitest';
// import { CartController } from './controllers/cart.controller';
// import { PrismaCartService } from './services/cart.service';
// import { CartDto } from './dto/cart.dto';
// import { MenuItem } from '../menu/entities/menu-item';
// import { CreateMenuItemSchema } from '../menu/dto/create-menu-item';
// import { UpdateMenuItemSchema } from '../menu/dto/update-menu-item';
// import { InMemoryCartService } from 'test/services/in-memory-cart-service';
// import { CreateMenuItemController } from 'src/menu/controllers/create-menu-item.controller';

// export const mockCart: CartDto = {
//   id: '1',
//   items: [
//     {
//       id: '1',
//       title: 'Product 1',
//       description: 'Description of product 1',
//       price: 10.99,
//       quantity: 2,
//       categoryId: '1',
//     },
//     {
//       id: '2',
//       title: 'Product 2',
//       description: 'Description of product 2',
//       price: 15.99,
//       quantity: 1,
//       categoryId: '2',
//     },
//   ],
//   totalSum: 37.97,
// };

// export const mockMenuItem: MenuItem = {
//   id: '1',
//   title: 'Product 1',
//   description: 'Description of product 1',
//   price: 10.99,
//   quantity: 2,
//   categoryId: '1',
// };

// export const mockCreateMenuItem: CreateMenuItemSchema = {
//   title: 'Product 3',
//   description: 'Description of product 3',
//   price: 20.99,
//   quantity: 1,
//   categoryId: '3',
// };

// export const mockUpdateMenuItem: UpdateMenuItemSchema = {
//   title: 'Updated Product 1',
//   description: 'Updated description of product 1',
//   price: 12.99,
//   quantity: 3,
//   categoryId: '1',
// };

// describe('CartService', () => {
//   let cartController: CartController;
//   let menuController: CreateMenuItemController;
//   let service: InMemoryCartService;

//   let firstItemId: string;

//   beforeAll(() => {
//     service = new InMemoryCartService();
//     cartController = new CartController(service);
//   });

//   it('should get cart by id', async () => {
//     const id = '1';
//     const expectedResult: CartDto = await service.getCartById(id);
//     jest.spyOn(service, 'getCartById').mockResolvedValue(expectedResult);

//     const result = await cartController.getCartById(id);

//     expect(result).toEqual(expectedResult);
//   });

//   it('should get cart item by id', async () => {
//     const id = '1';
//     const itemId = '1';
//     const expectedResult = await menuController.handle({
//       title: 'Product 1',
//       description: 'Description of product 1',
//       price: 10.99,
//       quantity: 2,
//       categoryId: '1',
//     });
//     jest.spyOn(service, 'getCartItemById').mockResolvedValue(expectedResult);

//     const result = await cartController.getCartItemById(id, itemId);

//     expect(result).toEqual(expectedResult);
//   });

//   // TO BE IMPLEMENTED

//   //   it('should update cart item', async () => {
//   //     const id = '1';
//   //     const itemId = '1';
//   //     const updatedItem: UpdateMenuItemSchema = /* Mock the updated item */;
//   //     const expectedResult: CartDto = /* Mock the expected result */;
//   //     jest.spyOn(service, 'updateCartItem').mockResolvedValue(expectedResult);

//   //     const result = await cartController.updateCartItem(id, itemId, updatedItem);

//   //     expect(result).toEqual(expectedResult);
//   //   });

//   //   it('should delete cart item', async () => {
//   //     const id = '1';
//   //     const itemId = '1';
//   //     jest.spyOn(service, 'deleteCartItem').mockResolvedValue();

//   //     await cartController.deleteCartItem(id, itemId);

//   //     expect(/* Add your expectations here for successful deletion */).toBe(/* Expected value */);
//   //   });

//   it('should add item to cart', async () => {
//     const id = '1';

//     const addedItem = await service.addItemToCart(id, mockCreateMenuItem);

//     expect(addedItem).toHaveProperty('id');
//     expect(addedItem['id']).toBeTypeOf('string');

//     expect(addedItem).toHaveProperty('title');
//     expect(addedItem['title']).toBeTypeOf('string');

//     expect(addedItem).toHaveProperty('description');
//     expect(addedItem['description']).toBeTypeOf('string');

//     expect(addedItem).toHaveProperty('quantity');
//     expect(addedItem['quantity']).toBeTypeOf('number');

//     expect(addedItem).toHaveProperty('categoryId');
//     expect(addedItem['categoryId']).toBeTypeOf('string');

//     firstItemId = addedItem.id;
//   });
// });
