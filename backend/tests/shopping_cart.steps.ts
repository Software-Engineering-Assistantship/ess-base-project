import { loadFeature, defineFeature } from 'jest-cucumber';
import { prismaMock } from '../setupTests';
import ShoppingCartService from '../src/services/ShoppingCartService';
import OrderItemEntity from '../src/entities/OrderItemEntity';

import app from '../src/app';
import request from 'supertest';

const feature = loadFeature('tests/features/shopping_cart.backend.feature');

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
        jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(1);
        when(/^eu vejo "(.*)" do "(.*)" por "(.*)" como opção$/, async (arg0, arg1, arg2) => {
                const itemId = 1; //TODO: get item id of the restaurant from the database
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                order = new OrderItemEntity(clientId, itemId);
                shopping_cart.push(order);
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                jest.spyOn(ShoppingCartService, 'insertOrderItem').mockResolvedValue([201, 'Item added to cart']);
                response = await request(app).post('/' + order.clientId + '/shopping_cart').send({ itemId: order.itemId });
                expect(response.body).toStrictEqual({message : 'Item added to cart'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
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
        var shopping_cart: OrderItemEntity[] = [new OrderItemEntity(2, 1)];
        var clientId: number;
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                clientId  = await ShoppingCartService.getClientId(user) as number;
                const itemId = 1; //TODO: get item id of the restaurant from the database
                const newQuantity = parseInt(arg0);
                shopping_cart[0].quantity = newQuantity;
                order = new OrderItemEntity(clientId, itemId);
                order.quantity = newQuantity;
                expect(shopping_cart).toEqual([order]);
        });

        var itemIdToUpdate: number;
        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, (arg0, arg1, arg2) => {
                itemIdToUpdate = 1; //TODO: get item id of the restaurant from the database
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
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                expect(order.quantity).toBe(parseInt(arg1)); //the quantity can only be one more or one less than the original.

                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(clientId);
                jest.spyOn(ShoppingCartService, 'updateOrderItem').mockResolvedValue([200, 'Item updated']);
                response = await request(app)
                             .put('/' + clientId.toString() + '/shopping_cart')
                             .send({ itemId: itemIdToUpdate, quantity: order.quantity });
                expect(response.body).toStrictEqual({message : 'Item updated'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
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
        var shopping_cart: OrderItemEntity[] = [new OrderItemEntity(2, 1)];
        var clientId: number;
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2)
                clientId  = await ShoppingCartService.getClientId(user) as number;
                const itemId = 1; //TODO: get item id of the restaurant from the database
                const newQuantity = parseInt(arg0);
                shopping_cart[0].quantity = newQuantity;
                order = new OrderItemEntity(clientId, itemId);
                order.quantity = newQuantity;
                expect(shopping_cart).toEqual([order]);
        });

        var itemIdToUpdate: number;
        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, (arg0, arg1, arg2) => {
                itemIdToUpdate = 1; //TODO: get item id of the restaurant from the database
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
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
                expect(order.quantity).toBe(parseInt(arg1)); //the quantity can only be one more or one less than the original.

                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(clientId);
                jest.spyOn(ShoppingCartService, 'updateOrderItem').mockResolvedValue([200, 'Item updated']);
                response = await request(app)
                             .put('/' + clientId.toString() + '/shopping_cart')
                             .send({ itemId: itemIdToUpdate, quantity: order.quantity });
                expect(response.body).toStrictEqual({message : 'Item updated'});
        });

        and(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
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
                { clientId: 2, itemId: 1, quantity: 3 },
                { clientId: 2, itemId: 2, quantity: 1 },
        ];
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, (arg0, arg1, arg2, arg3) => {
                const coxinhaId = 1; //TODO: get item id of the restaurant from the database
                const l = shopping_cart.filter((item) => item.itemId === coxinhaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, (arg0, arg1, arg2, arg3) => {
                const pitsaId = 2; //TODO: get item id of the restaurant from the database
                const l = shopping_cart.filter((item) => item.itemId === pitsaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        var itemIdToRemove: number;
        when(/^eu seleciono a opção "(.*)" do produto no carrinho "(.*)" do "(.*)"$/, (arg0, arg1, arg2) => {
                itemIdToRemove = 1; //TODO: get item id of the restaurant from the database
                shopping_cart = shopping_cart.filter((item) => item.itemId !== itemIdToRemove);
        });

        var response: any;
        then(/^uma requisição "(.*)" com "(.*)" unidade\(s\) de "(.*)" do "(.*)" por "(.*)" é enviada para "(.*)"$/, async (arg0, arg1, arg2, arg3, arg4, arg5) => {
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

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, async (arg0, arg1, arg2, arg3) => {
                jest.spyOn(ShoppingCartService, 'getClientId').mockResolvedValue(2);
                const clientId = (await ShoppingCartService.getClientId(user)) as number;
                const itemId = 2; //TODO: get item id of the restaurant from the database
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
                { clientId: 2, itemId: 1, quantity: 3 },
                { clientId: 2, itemId: 2, quantity: 1 },
        ];
        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, (arg0, arg1, arg2, arg3) => {
                const coxinhaId = 1; //TODO: get item id of the restaurant from the database
                const l = shopping_cart.filter((item) => item.itemId === coxinhaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        and(/^o carrinho contém "(.*)" unidade\(s\) de "(.*)" por "(.*)" do "(.*)"$/, (arg0, arg1, arg2, arg3) => {
                const pitsaId = 2; //TODO: get item id of the restaurant from the database
                const l = shopping_cart.filter((item) => item.itemId === pitsaId);
                expect(l.length).toBe(1);
                expect(l[0].quantity).toBe(parseInt(arg0));
        });

        var orderToFinishId: number;
        when(/^eu seleciono a opção "(.*)" no carrinho$/, (arg0) => {
                //TODO: get the order id from the database
                orderToFinishId = 1;
                shopping_cart = [];
        });

        var response: any;
        then(/^uma requisição "(.*)" é enviada para "(.*)"$/, async (arg0, arg1) => {
          //TODO: calculate the price of the order
          response = await request(app)
                          .put('/orders/' + orderToFinishId.toString())
                          .send({ price: 100 });
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
