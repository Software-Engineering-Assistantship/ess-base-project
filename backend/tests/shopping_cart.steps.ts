import { loadFeature, defineFeature } from 'jest-cucumber';
import { prismaMock } from '../setupTests';
import ShoppingCartService from '../src/services/ShoppingCartService';
import ShoppingCartModel from '../src/models/ShoppingCartModel';
import OrdersModel from '../src/models/OrdersModel';
import OrderItemEntity from '../src/entities/OrderItemEntity';

import app from '../src/app';
import request from 'supertest';

const feature = loadFeature('tests/features/shopping_cart.backend.feature');

const getRestaurantId = (restaurants: any[], restaurantToFindName: string) => {
    return restaurants.filter((restaurant) => restaurant.name === restaurantToFindName)[0].id;
}

const getItemsOfRestaurant = async (restaurantName: string) => {
    jest.spyOn(ShoppingCartModel, 'indexRestaurants').mockResolvedValue(getRestaurants());
    const restaurants = await ShoppingCartModel.indexRestaurants();
    const restaurantId = getRestaurantId(restaurants, restaurantName);
    jest.spyOn(ShoppingCartModel, 'indexItems').mockResolvedValue(getItems().filter((item: any) => item.id === restaurantId));
    return await ShoppingCartModel.indexItems(restaurantId);
};

const getRestaurants = () => { return [
    { id: 1, name: 'Restaurante Glória Maria Juazeiro', cnpj: '12345678901233', email: 'my_email@gmail.com' },
    { id: 2, name: 'Restaurante Glória Maria Maria Juazeiro', cnpj: '12345678901234', email: 'some_email@gmail.com' },
    { id: 3, name: 'Restaurante Glória Maria Juazeiro Oficial', cnpj: '12345678901235', email: 'another_email@gmail.com' },
]; };
const getItems = () => { return [
    { id: 1, name: 'Coxinha', price: 1.0, restaurantId: 1 },
    { id: 2, name: 'Coxinha', price: 1.0, restaurantId: 2 },
    { id: 3, name: 'Pitsa', price: 10.0, restaurantId: 3 },
]; };

defineFeature(feature, (test) => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('Consulta ao Banco de Dados carrega o carrinho do usuário após login', ({ given, when, then, and }) => {
        var screen = '';
        var user = '';
        const db_orderItems = [
                { clientId: 1, itemId: 1, quantity: 1 },
                { clientId: 1, itemId: 2, quantity: 2 },
                { clientId: 1, itemId: 3, quantity: 3 },
        ];

        given(/^eu estou na tela "(.*)"$/, async (arg0) => {
                screen = arg0;
                expect(screen).toBe('Login');
        });
        when(/^eu faço login como "(.*)"$/, (arg0) => {
                user = arg0;
        });

        var response: any;
        then(/^uma requisição "(.*)" para "(.*)" é enviada$/, async (arg0, arg1) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(1);
                jest.spyOn(ShoppingCartService, 'getUserOrderItems').mockResolvedValue(db_orderItems);
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                response = await request(app).get('/' + clientId.toString() + '/shopping_cart');
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o JSON da resposta contém a lista de itens no carrinho do usuário "(.*)"$/, (arg0) => {
                expect(response.body).toEqual(db_orderItems);
        });
    });

    test('Salvando produtos adicionados ao carrinho no Banco de Dados', ({ given, and, when, then }) => {
        var user = '';
        var screen = '';
        given(/^eu estou logado como "(.*)" na tela "(.*)"$/, async (arg0, arg1) => {
                user = arg0;
                screen = arg1;
                expect(screen).toBe('Restaurantes');
        });

        var shopping_cart: OrderItemEntity[] = [];
        and('o carrinho está vazio', () => {
                expect(shopping_cart).toEqual([]);
        });

        var order: OrderItemEntity;
        when(/^eu vejo "(.*)" do "(.*)" por "(.*)" \$ como opção$/, async (arg0, arg1, arg2) => {
                const items = await getItemsOfRestaurant(arg1);
                const itemId = items.filter((item) => item.name === arg0 && item.price === Number(arg2))[0].id; //getting the id of the item
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(1);
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                order = new OrderItemEntity(clientId, itemId);
                shopping_cart.push(order);
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" \$ é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                jest.spyOn(ShoppingCartService, 'insertOrderItem').mockResolvedValue([201, 'Item added to cart']);
                response = await request(app).post('/' + order.clientId + '/shopping_cart').send({ itemId: order.itemId });
                expect(response.body).toStrictEqual({message : 'Item added to cart'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getUserOrderItems').mockResolvedValue([order]);
                response = await request(app).get('/' + order.clientId + '/shopping_cart');
                expect(shopping_cart).toEqual(response.body);
        });
    });

    test('Aumentando a quantidade de produtos no Banco de Dados', ({ given, and, when, then }) => {
        var user = '';
        var screen = '';
        given(/^eu estou logado como "(.*)" na tela "(.*)"$/, (arg0, arg1) => {
                user = arg0;
                screen = arg1;
                expect(screen).toBe('Restaurantes');
        });

        var order: OrderItemEntity;
        var shopping_cart: OrderItemEntity[] = [new OrderItemEntity(2, 2)];
        var clientId: number;
        var itemId: number;
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                clientId  = await ShoppingCartService.getClientId(user) as number;
                const items = await getItemsOfRestaurant(arg3);
                itemId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const newQuantity = parseInt(arg0);
                shopping_cart[0].quantity = newQuantity;
                order = new OrderItemEntity(clientId, itemId);
                order.quantity = newQuantity;
                expect(shopping_cart).toEqual([order]);
        });

        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, (arg0, arg1, arg2) => {
                switch(arg0) {
                        case 'aumentar quantidade':
                                shopping_cart[0].quantity++;
                                order.quantity++;
                                break;
                        case 'diminuir quantidade':
                                shopping_cart[0].quantity--;
                                order.quantity--;
                                expect(shopping_cart[0].quantity).toBeGreaterThanOrEqual(0);
                                break;
                }
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" \$ é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                expect(order.quantity).toBe(parseInt(arg1)); //the quantity can only be one more or one less than the original.

                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(clientId);
                jest.spyOn(ShoppingCartService, 'updateOrderItem').mockResolvedValue([200, 'Item updated']);
                response = await request(app)
                             .put('/' + clientId.toString() + '/shopping_cart')
                             .send({ itemId, quantity: order.quantity });
                expect(response.body).toStrictEqual({message : 'Item updated'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                jest.spyOn(ShoppingCartService, 'getUserOrderItems').mockResolvedValue([order]);
                response = await request(app).get('/' + clientId.toString() + '/shopping_cart');
                expect(shopping_cart).toEqual(response.body);
        });
    });

    test('Diminuindo a quantidade de produtos no Banco de Dados', ({ given, and, when, then }) => {
        var user = '';
        var screen = '';
        given(/^eu estou logado como "(.*)" na tela "(.*)"$/, (arg0, arg1) => {
                user = arg0;
                screen = arg1;
                expect(screen).toBe('Restaurantes');
        });

        var order: OrderItemEntity;
        var shopping_cart: OrderItemEntity[] = [new OrderItemEntity(2, 2)];
        var clientId: number;
        var itemId: number;
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                clientId  = await ShoppingCartService.getClientId(user) as number;
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                clientId  = await ShoppingCartService.getClientId(user) as number;
                const items = await getItemsOfRestaurant(arg3);
                itemId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const newQuantity = parseInt(arg0);
                shopping_cart[0].quantity = newQuantity;
                order = new OrderItemEntity(clientId, itemId);
                order.quantity = newQuantity;
                expect(shopping_cart).toEqual([order]);
        });

        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, (arg0, arg1, arg2) => {
                switch(arg0) {
                        case 'aumentar quantidade':
                                shopping_cart[0].quantity++;
                                order.quantity++;
                                break;
                        case 'diminuir quantidade':
                                shopping_cart[0].quantity--;
                                order.quantity--;
                                expect(shopping_cart[0].quantity).toBeGreaterThanOrEqual(0);
                                break;
                        default:
                                expect(true).toBeFalsy();
                }
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" \$ é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                expect(order.quantity).toBe(parseInt(arg1)); //the quantity can only be one more or one less than the original.

                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(clientId);
                jest.spyOn(ShoppingCartService, 'updateOrderItem').mockResolvedValue([200, 'Item updated']);
                response = await request(app)
                             .put('/' + clientId.toString() + '/shopping_cart')
                             .send({ itemId, quantity: order.quantity });
                expect(response.body).toStrictEqual({message : 'Item updated'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                jest.spyOn(ShoppingCartService, 'getUserOrderItems').mockResolvedValue([order]);
                response = await request(app).get('/' + clientId.toString() + '/shopping_cart');
                expect(shopping_cart).toEqual(response.body);
        });
    });

    test('Removendo produtos do carrinho no Banco de Dados', ({ given, and, when, then }) => {
        var user = '';
        var screen = '';
        given(/^eu estou logado como "(.*)" na tela "(.*)"$/, (arg0, arg1) => {
                user = arg0;
                screen = arg1;
                expect(screen).toBe('Restaurantes');
        });

        var shopping_cart: OrderItemEntity[] = [
                { clientId: 2, itemId: 3, quantity: 1 },
                { clientId: 2, itemId: 2, quantity: 3 },
        ];
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                const items = await getItemsOfRestaurant(arg3);
                const coxinhaId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const l = shopping_cart.filter((item) => item.itemId === coxinhaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                const items = await getItemsOfRestaurant(arg3);
                const pitsaId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const l = shopping_cart.filter((item) => item.itemId === pitsaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        var itemIdToRemove: number;
        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, async (arg0, arg1, arg2) => {
                expect(arg0).toBe('remover item');
                const items = await getItemsOfRestaurant(arg2);
                itemIdToRemove = items.filter((item) => item.name === arg1)[0].id; //getting the id of the item
                shopping_cart = shopping_cart.filter((item) => item.itemId !== itemIdToRemove);
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" \$ é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2);
                jest.spyOn(ShoppingCartService, 'removeOrderItem').mockResolvedValue([200, 'Item removed from cart']);
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                response = await request(app)
                             .delete('/' + clientId.toString()  + '/shopping_cart')
                             .send({ itemId: itemIdToRemove });
                expect(response.body).toStrictEqual({message : 'Item removed from cart'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2);
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                const items = await getItemsOfRestaurant(arg3);
                const itemId = items.filter((item) => item.name === arg1)[0].id; //getting the id of the item
                expect(shopping_cart).toEqual([{ clientId, itemId, quantity: parseInt(arg0) }]);
        });
    });

    test('Finalizando pedidos no Banco de Dados', ({ given, and, when, then }) => {
        var user = '';
        var screen = '';
        given(/^eu estou logado como "(.*)" na tela "(.*)"$/, (arg0, arg1) => {
                user = arg0;
                screen = arg1;
                expect(screen).toBe('Restaurantes');
        });

        var shopping_cart: OrderItemEntity[] = [
                { clientId: 2, itemId: 3, quantity: 1 },
                { clientId: 2, itemId: 2, quantity: 3 },
        ];
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                const items = await getItemsOfRestaurant(arg3);
                const coxinhaId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const l = shopping_cart.filter((item) => item.itemId === coxinhaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" \$ do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                const items = await getItemsOfRestaurant(arg3);
                const pitsaId = items.filter((item) => item.name === arg1 && item.price === Number(arg2))[0].id; //getting the id of the item
                const l = shopping_cart.filter((item) => item.itemId === pitsaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        var orderToFinishId: number;
        when(/^eu seleciono a opção "(.*)" no carrinho$/, async (arg0) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2);
                jest.spyOn(ShoppingCartModel, 'getOrderIdOfShoppingCart').mockResolvedValue(1);
                orderToFinishId = await ShoppingCartModel.getOrderIdOfShoppingCart(
                        await ShoppingCartService.getClientId(user) as number
                );
                expect(arg0).toBe('finalizar pedido');
        });

        var response: any;
        then(/^uma requisição "(.*)" é enviada para "(.*)"$/, async (arg0, arg1) => {
          var price = 0.0;
          for (const item of shopping_cart) {
            price += getItems().filter((i) => i.id === item.itemId)[0].price * item.quantity;
          }

          jest.spyOn(OrdersModel, 'update').mockResolvedValue({ status: 'Em preparo' });
          response = await request(app)
                          .put('/orders/' + orderToFinishId.toString())
                          .send({ price });
          shopping_cart = [];
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o pedido tem status diferente de "(.*)"$/, (arg0) => {
                expect(response.body.status).not.toBe(arg0);
        });

        and('o carrinho está vazio', () => {
                expect(shopping_cart).toEqual([]);
        });
    });
});
