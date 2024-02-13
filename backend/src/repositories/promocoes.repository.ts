import PromocoesEntity from '../entities/promocoes.entity'; // Importa a entidade de usuário
import BaseRepository from './base.repository'; // Importa o repositório base

class PromocoesRepository extends BaseRepository<PromocoesEntity> {
  constructor() {
    super('promocoes'); // Define o prefixo para promoções
  }

  public async getAllPromocoes(): Promise<PromocoesEntity[]> {
    return await this.findAll();
  }

  public async getPromocoesById(id: string): Promise<PromocoesEntity | null> {
    return await this.findOne((promocoes) => promocoes.id === id);
  }

  public async createPromocoes(data: PromocoesEntity): Promise<PromocoesEntity> {
    return await this.add(data);
  }

  public async updatePromocoesById(id: string, data: PromocoesEntity): Promise<PromocoesEntity | null> {
    return await this.update((promocoes) => promocoes.id === id, data);
  }

}

export default PromocoesRepository;