import CarrinhoEntity from "../entities/carrinho.entity";
import CarrinhoModel from "../models/carrinho.model";
import CarrinhoRepository from "../repositories/carrinho.repository";

class CarrinhoService {
    private carrinhoRepository: CarrinhoRepository;

    constructor(carrinhoRepository: CarrinhoRepository) {
        this.carrinhoRepository = carrinhoRepository;
    }

    public async createCarrinho(data: CarrinhoEntity): Promise<CarrinhoModel> {
        const carrinhoEntity = await this.carrinhoRepository.createCarrinho(data);
        const carrinhoModel = new CarrinhoModel(carrinhoEntity);

        return carrinhoModel;
    }

    public async getCarrinhoById(id: string): Promise<CarrinhoModel | null> {
        const carrinhoEntity = await this.carrinhoRepository.getCarrinhoById(id);
        const carrinhoModel = carrinhoEntity ? new CarrinhoModel(carrinhoEntity) : null;

        return carrinhoModel as CarrinhoModel;
    }

    public async addProductToCarrinho(id_carrinho: string, id_product: string, valor: number): Promise<CarrinhoModel> {
        // const carrinhoEntity = await this.carrinhoRepository.addProductToCarrinho(id_carrinho, id_product, valor);
        // const carrinhoModel = carrinhoEntity ? new CarrinhoModel(carrinhoEntity) : null;
        // return carrinhoModel as CarrinhoModel;

        const carrinhoEntity = await this.carrinhoRepository.getCarrinhoById(id_carrinho);

        if(!carrinhoEntity) {
            throw new Error('Carrinho não encontrado');
        }

        carrinhoEntity.id_produtos.push(id_product);
        await this.carrinhoRepository.updateCarrinho(carrinhoEntity);
        return new CarrinhoModel(carrinhoEntity);
    }
}

export default CarrinhoService;