import supertest from 'supertest';
import TestEntity from '../../src/entities/test.entity';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

describe('TestController', () => {
  let request = supertest(app);
  let mockTestRepository: TestRepository;

  let mockTestEntity: TestEntity = new TestEntity({
    id: '123',
    name: 'test',
  });

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
  });

  it('should return a test by id', async () => {
    const createdTestEntity = await mockTestRepository.createTest(
      mockTestEntity
    );

    const response = await request.get(`/api/tests/${createdTestEntity.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(createdTestEntity);
  });

  it('should throw an error when test is not found', async () => {
    const response = await request.get(`/api/tests/02`);

    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('test_not_found');
  });

  it('should create a test', async () => {
    const response = await request.post('/api/tests').send(mockTestEntity);

    expect(response.status).toBe(200);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        name: mockTestEntity.name,
      })
    );
  });

  it('should update a test', async () => {
    const createdTestEntity = await mockTestRepository.createTest(
      mockTestEntity
    );

    const response = await request
      .put(`/api/tests/${createdTestEntity.id}`)
      .send({
        name: 'test2',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        name: 'test2',
      })
    );
  });

  it('should delete a test', async () => {
    const createdTestEntity = await mockTestRepository.createTest(
      mockTestEntity
    );

    const response = await request.delete(`/api/tests/${createdTestEntity.id}`);

    const deletedTestEntity = await mockTestRepository.getTest(
      createdTestEntity.id
    );
    expect(response.status).toBe(200);
    expect(deletedTestEntity).toBeNull();
  });
});
