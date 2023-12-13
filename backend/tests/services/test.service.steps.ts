import { loadFeature, defineFeature } from 'jest-cucumber';
import TestRepository from '../../src/repositories/test.repository';
import TestEntity from '../../src/entities/test.entity';
import TestService from '../../src/services/test.service';
import OtherRepository from '../../src/repositories/other.repository';
import TestModel from '../../src/models/test.model';

const feature = loadFeature('tests/features/tests-service.feature');

defineFeature(feature, (test) => {
    // mocking the repository
    let mockTestRepository: TestRepository;
    let mockOtherRepository: OtherRepository;
    let service: TestService;

    let tests: TestEntity[];
    let testReturned: TestEntity;
    let idToCall: string;
        
    let mockTestEntity: TestEntity;
    let mockTestModel: TestModel;

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

    test('Return all tests', ({ given, when, then }) => {
        given(
            /^o método getTests do TestService retorna um array com o test de nome "(.*)" e id "(.*)"$/, 
            async (testName, testId) => {
                mockTestEntity = new TestEntity({
                    id: testId,
                    name: testName,
                });

                jest.spyOn(mockTestRepository, 'getTests')
                    .mockResolvedValue([mockTestEntity]);
        });

        when("o método getTests do TestService for chamado", async () => {
            tests = await service.getTests();
        }
        );

        then(/^o array retornado deve conter o test de nome "(.*)" e id "(.*)"$/, (testName, testId) => {
            
            mockTestModel = new TestModel(
                new TestEntity({ id: testId, name: testName })
            );

            expect(tests).toEqual([mockTestModel]);
        });
    });

    test('Return test by id', ({ given, when, then }) => {
        given(
            /^o método getTest chamado com "(.*)" do TestService retorna um test de nome "(.*)" e id "(.*)"$/, 
            async (id, testName, testId) => {
                idToCall = id;

                mockTestEntity = new TestEntity({
                    id: testId,
                    name: testName,
                });

                jest.spyOn(mockTestRepository, 'getTest')
                    .mockResolvedValue(mockTestEntity);
        });

        when(
            /^o método getTest do TestService for chamado com o id "(.*)"$/, 
            async (testId) => {
            testReturned = await service.getTest(testId);
        }
        );

        then(/^o test retornado deve ter o nome "(.*)" e id "(.*)"$/, (testName, testId) => {
            
            const testEntity = new TestEntity({ id: testId, name: testName });

            expect(testReturned).toEqual(testEntity);
            expect(mockTestRepository.getTest).toBeCalledWith(idToCall);
        });
    });
});
