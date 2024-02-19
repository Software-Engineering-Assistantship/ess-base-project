import CarrinhoEntity from "../entities/carrinho.entity";
import BaseRepository from "./base.repository";
import fs from 'fs';

export default class CarrinhoRepository extends BaseRepository<CarrinhoEntity> {
    constructor() {
        super('carrinho');
    }

    public async createCarrinho(data: CarrinhoEntity): Promise<CarrinhoEntity> {
        fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(data));

        return data;
    }

    public async getCarrinhoById(id: string): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        if (carrinhoJson.id === id) {
            return carrinhoJson;
        }

        return null;
    }

    public async updateCarrinho(data: CarrinhoEntity): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        if (carrinhoJson.id_user === data.id) {
            fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(data));

            return data;
        }

        return null;
    }

    public async addProductToCarrinho(id_carrinho : string, id_product: string, valor: number): Promise<CarrinhoEntity | null> {
        const carrinhoJson = JSON.parse(fs.readFileSync('./src/models/carrinho.json', 'utf-8'));

        if (carrinhoJson.id === id_carrinho) {
            if(!carrinhoJson.produtos) {
                carrinhoJson.produtos = [];
            }
            carrinhoJson.produtos.push({
                id: id_product,
                valor: valor
            });
            fs.writeFileSync('./src/models/carrinho.json', JSON.stringify(carrinhoJson));

            return carrinhoJson;
        }

        return null;
    }
}