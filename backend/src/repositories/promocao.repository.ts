import PromocaoEntity from '../entities/promocao.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base

class PromocaoRepository extends BaseRepository<PromocaoEntity> {
  constructor() {
    super('promocoes'); // Define o prefixo para promoções
  }

  public async getAllPromocoes(): Promise<PromocaoEntity[]> {
    return await this.findAll();
  }

  public async getPromocaoById(id: string): Promise<PromocaoEntity | null> {
    return await this.findOne((promocao) => promocao.id === id);
  }

  public async createPromocao(data: PromocaoEntity): Promise<PromocaoEntity> {
    return await this.add(data);
  }

  public async updatePromocaoById(id: string, data: PromocaoEntity): Promise<PromocaoEntity | null> {
    return await this.update((promocao) => promocao.id === id, data);
  }

}

export default PromocaoRepository;