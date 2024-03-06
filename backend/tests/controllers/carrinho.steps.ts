import {loadFeature, defineFeature} from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import {di} from '../../src/di';
import ProductService from '../../src/services/product.service';
import CarrinhoModel from '../../src/models/carrinho.model';
import UserModel from '../../src/models/user.model';
import ProductModel from '../../src/models/product.model';
import UserService from '../../src/services/user.service';
import UserRepository from '../../src/repositories/user.repository';
import ProductRepository from '../../src/repositories/product.repository';
import CarrinhoRepository from '../../src/repositories/carrinho.repository';
import CarrinhoService from '../../src/services/carrinho.service';

const feature = loadFeature('tests/features/carrinho.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let mockProductRepository: ProductRepository;
    let mockCarrinhoRepository: CarrinhoRepository;
    let response: supertest.Response;
    let userService: UserService;
    let productService: ProductService;
    let carrinhoService: CarrinhoService;


    const carrinhoData = new CarrinhoModel({
        id: "123.456.789-01",
        id_produtos: [],
        quantidade: 0,
        data_criacao: new Date(),
        data_atualizacao: new Date()
    });
    const productData = new ProductModel({
        nome: 'Piada Mortal',
        id: '12346',
        quantidade: 7,
        preco: 20.00,
        local: 'São Paulo',
    });
    const userData = new UserModel({
        nome: 'Teste',
        cpf: '123.456.789-01',
        dataNascimento: '25/10/1999',
        email: '',
        login: 'teste',
        senha: 'senhateste',
        logado: false
    });

    beforeEach(() => {
        mockUserRepository = di.getRepository<UserRepository>(UserRepository);
        mockProductRepository = di.getRepository<ProductRepository>(ProductRepository);
        mockCarrinhoRepository = di.getRepository<CarrinhoRepository>(CarrinhoRepository);

        const user = new UserModel({
            nome: 'Teste',
            cpf: '123.456.789-01',
            dataNascimento: '25/10/1999',
            email: '',
            login: 'teste',
            senha: 'senhateste',
            logado: false
        })
        const userCart = new CarrinhoModel({
            id: "123",
            id_produtos: [],
            quantidade: 0,
            data_criacao: new Date(),
            data_atualizacao: new Date()
        })
        const product = new ProductModel({
            nome: 'Piada Mortal',
            id: '123.456.789-01',
            quantidade: 7,
            preco: 20.00,
            local: 'São Paulo',
        })

        userService = new UserService(mockUserRepository);
        userService.createUser(user);
        productService = new ProductService(mockProductRepository);
        productService.createProduct(product);
        carrinhoService = new CarrinhoService(mockCarrinhoRepository);
        carrinhoService.createCarrinho(userCart);
    });

    test('Adicionar item ao carrinho', ({given, when, then, and}) => {

        given(/^Estou na página do item de id "(.*)" cujo item está presente no sistema com os campos$/, async (id) => {
            productData.id = id;

            // criando carrinho
            const rotaCarrinho = '/api/cart/create';
            response = await request.post(rotaCarrinho).send(carrinhoData);
            carrinhoService.createCarrinho(carrinhoData);
        });

        when('eu o adiciono ao carrinho', async () => {

            const rota = '/api/carrinho/addProduct';
            response = await request.post(rota).send(
                {
                    id_carrinho: carrinhoData.id,
                    id_product: productData.id,
                    valor: productData.preco
                }
            );
        });
    
        then('apenas o item adicionado estará presente na lista do carrinho', async () => {
            console.log(response.body.data);
            console.log(response.body);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id_produtos).toContain(productData.id);
            expect(response.body.data.id).toBe(userData.cpf);
        });
    });
    });