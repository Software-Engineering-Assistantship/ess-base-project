import {loadFeature, defineFeature} from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import {di} from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/carrinho.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockTestRepository: TestRepository;
    let response: supertest.Response;

    beforeEach(() => {
        mockTestRepository = di.getRepository<TestRepository>(TestRepository);
    });

    test('Adicionar produto ao carrinho', ({given, when, then, and}) => {
        given('que o usuário tem um carrinho vazio', async () => {
        // Nothing to do here
        });
    
        when('o usuário adicionar um produto ao carrinho', async () => {
        // Nothing to do here
        });
    
        then('o carrinho deve conter um produto', async () => {
        // Nothing to do here
        });
    
        and('o carrinho deve conter um total de 1 produto', async () => {
        // Nothing to do here
        });
    });
    });