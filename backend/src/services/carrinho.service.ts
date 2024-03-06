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

    public async addProductToCarrinho(id_carrinho: string, id_product: string): Promise<CarrinhoModel | null> {
        // verifica se o carrinho existe
        const carrinhoEntity = await this.carrinhoRepository.getCarrinhoById(id_carrinho);
        if(!carrinhoEntity) {
            return null;
        }

        await this.carrinhoRepository.addProductToCarrinho(id_carrinho, id_product);
        // retorna o novo valor de carrinho
        return new CarrinhoModel(await this.carrinhoRepository.getCarrinhoById(id_carrinho) as CarrinhoEntity);

        // REFACTOR: são realizadas duas requisições idênticas na atual função. Pode comprometer eficiênca.
    }
}

export default CarrinhoService;