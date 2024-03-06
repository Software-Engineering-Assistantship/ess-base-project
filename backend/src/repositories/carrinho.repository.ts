import CarrinhoEntity from "../entities/carrinho.entity";
import BaseRepository from "./base.repository";
import fs from 'fs';

const carrinhoJsonPath = './src/models/carrinho.json'

export default class CarrinhoRepository extends BaseRepository<CarrinhoEntity> {
    constructor() {
        super('carrinho');
    }

    public async createCarrinho(data: CarrinhoEntity): Promise<CarrinhoEntity> {
        if (!fs.existsSync(carrinhoJsonPath)) {
            fs.writeFileSync(carrinhoJsonPath, '[]');
        } 

        const carrinhoJson = JSON.parse(fs.readFileSync(carrinhoJsonPath, 'utf-8'));

        const addData = [...carrinhoJson, data];

        fs.writeFileSync(carrinhoJsonPath, JSON.stringify(addData));
        return data;
    }

    public async getCarrinhoById(id: string): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        for (const carrinho of carrinhoJson) {
            if (carrinho.id === id) {
                return carrinho;
            }
        }

        return null;
    }

    public async updateCarrinho(id_carrinho: string, id_product: string): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));
        var newCarrinhoJson = [];
        var returnCarrinho = null; // valor a ser retornado pela função 

        for (const carrinho of carrinhoJson) {
            if (carrinho.id === id_carrinho) {
                carrinho.produtos.push(id_product);
                returnCarrinho = carrinho;
                newCarrinhoJson.push(carrinho);
            }
            else {
                newCarrinhoJson.push(carrinho);
            }
        }

        fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(newCarrinhoJson));
        return returnCarrinho;
    }

    public async addProductToCarrinho(id_carrinho : string, id_product: string): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));
        var newCarrinhoJson = [];
        var returnCarrinho = null; // valor a ser retornado pela função 

        for (const carrinho of carrinhoJson) {
            if (carrinho.id === id_carrinho) {
                carrinho.id_produtos.push(id_product);
                returnCarrinho = carrinho;
                newCarrinhoJson.push(carrinho);
            }
            else {
                newCarrinhoJson.push(carrinho);
            }
        }

        fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(newCarrinhoJson));
        return returnCarrinho;
    }
}