import TestEntity from '../entities/test.entity';
import BaseRepository from './base.repository';

class TestRepository extends BaseRepository<TestEntity> {
  constructor() {
    super('tests');
  }

  public async getTests(): Promise<TestEntity[]> {
    return await this.findAll();
  }

  public async getTest(id: string): Promise<TestEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createTest(data: TestEntity): Promise<TestEntity> {
    return await this.add(data);
  }

  public async updateTest(
    id: string,
    data: TestEntity
  ): Promise<TestEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteTest(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default TestRepository;
