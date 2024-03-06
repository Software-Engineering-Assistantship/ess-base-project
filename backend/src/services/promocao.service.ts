import PromocaoEntity from '../entities/promocao.entity'; // Importa a entidade de promoção
import PromocaoModel from '../models/promocao.model'; // Importa o modelo de promoção
import PromocaoRepository from '../repositories/promocao.repository'; // Importa o repositório de promoção
import { HttpNotFoundError } from '../utils/errors/http.error'; // Importa o erro de não encontrado HTTP

class PromocaoServiceMessageCode {
    public static readonly promocao_not_found = 'promocao_not_found';
}

class PromocaoService {
  private promocaoRepository: PromocaoRepository;

  constructor(promocaoRepository: PromocaoRepository) {
    this.promocaoRepository = promocaoRepository;
  }

public async getAllPromocoes(): Promise<PromocaoModel[]> {
    const promocoesEntity = await this.promocaoRepository.getAllPromocoes();

    const promocoesModel = promocoesEntity.map((promocao: PromocaoEntity) => new PromocaoModel(promocao));

    return promocoesModel;
}

  public async getPromocaoById(id: string): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.getPromocaoById(id);

    if (!promocaoEntity) {
      throw new HttpNotFoundError({
        msg: 'Promocao not found',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async createPromocao(data: PromocaoEntity): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.createPromocao(data);
    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }

  public async updatePromocaoById(id: string, data: PromocaoEntity): Promise<PromocaoModel> {
    const promocaoEntity = await this.promocaoRepository.updatePromocaoById(id, data);

    if (!promocaoEntity) {
      throw new HttpNotFoundError({
        msg: 'Promocao not found',
        msgCode: PromocaoServiceMessageCode.promocao_not_found,
      });
    }

    const promocaoModel = new PromocaoModel(promocaoEntity);

    return promocaoModel;
  }


}

export default PromocaoService;