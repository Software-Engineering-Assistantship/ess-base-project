import TestEntity from '../entities/test.entity';
import BaseRepository from './base.repository';

class OtherRepository extends BaseRepository<TestEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<TestEntity[]> {
    return await this.findAll();
  }
}

export default OtherRepository;
