import TestEntity from '../../src/entities/test.entity';
import TestModel from '../../src/models/test.model';
import OtherRepository from '../../src/repositories/other.repository';
import TestRepository from '../../src/repositories/test.repository';
import TestService from '../../src/services/test.service';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

describe('TestService', () => {
  let mockTestRepository: TestRepository;
  let mockOtherRepository: OtherRepository;
  let service: TestService;

  let mockTestEntity: TestEntity = new TestEntity({
    id: '123',
    name: 'test',
  });

  let mockTestModel: TestModel = new TestModel(mockTestEntity);

  beforeEach(() => {
    mockTestRepository = {
      getTests: jest.fn(),
      getTest: jest.fn(),
      createTest: jest.fn(),
      updateTest: jest.fn(),
      deleteTest: jest.fn(),
    } as any;

    mockOtherRepository = {
      getTests: jest.fn(),
    } as any;

    service = new TestService(mockTestRepository, mockOtherRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return all tests', async () => {
    jest
      .spyOn(mockTestRepository, 'getTests')
      .mockResolvedValue([mockTestEntity]);

    const tests = await service.getTests();

    expect(tests).toEqual([mockTestModel]);
    expect(mockTestRepository.getTests).toBeCalledTimes(1);
  });

  it('should return a test by id', async () => {
    const id = '123';

    jest.spyOn(mockTestRepository, 'getTest').mockResolvedValue(mockTestEntity);

    const test = await service.getTest(id);

    expect(test).toEqual(mockTestModel);
    expect(mockTestRepository.getTest).toBeCalledWith(id);
  });

  it('should throw an error when test is not found', async () => {
    const id = '123';

    jest.spyOn(mockTestRepository, 'getTest').mockResolvedValue(null);

    await expect(service.getTest(id)).rejects.toThrow(HttpNotFoundError);
    expect(mockTestRepository.getTest).toBeCalledWith(id);
  });

  it('should create a test', async () => {
    jest
      .spyOn(mockTestRepository, 'createTest')
      .mockResolvedValue(mockTestEntity);
    await service.createTest(mockTestEntity);

    expect(mockTestRepository.createTest).toBeCalledWith(mockTestEntity);
  });

  it('should update a test', async () => {
    const id = '123';

    jest
      .spyOn(mockTestRepository, 'updateTest')
      .mockResolvedValue(mockTestEntity);

    const updateTest = await service.updateTest(id, mockTestEntity);

    expect(mockTestRepository.updateTest).toBeCalledWith(id, mockTestEntity);
    expect(updateTest).toEqual(mockTestModel);
  });

  it('should delete a test', async () => {
    const id = '123';
    await service.deleteTest(id);

    expect(mockTestRepository.deleteTest).toBeCalledWith(id);
  });
});
