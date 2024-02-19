import { defineFeature, loadFeature } from 'jest-cucumber';
import { PrismaClient } from '@prisma/client';

import database from '../database/connection';
import request from 'supertest';
import app from '../../app';

const features = loadFeature('../backend/src/tests/features/receipt.feature')
const prismaTestClient = new PrismaClient()
let APIresponse:request.Response
defineFeature(features, test=>{
    beforeAll(async () => {
        await database.clearValues();
        await database.connect();
      });
    
      afterAll(async () => {
        await database.clearValues();
        await database.disconnect();
      });
    beforeEach(async () => {
        await database.clearValues();
      });
    
    test('Criar comprovante', ({given, when, then})=>{
        given(/^a API solicita os argumentos nome, produto, quantidade, preço como obrigatórios para a criação do item$/, ()=>{})
        when(/^envio uma requisição POST para a rota \/receipt com nome "(.*)", produto "(.*)" quantidade "(.*)", preço "(.*)"$/, async(nome, produto, quantidade, preco)=>{
            APIresponse = await request(app).post('/receipt').send({name:nome, product:produto, amount:Number(quantidade), price:parseFloat(preco)})
            
        })
        then(/^o status da resposta deve ser "(.*)"$/, async(status)=>{
            expect(APIresponse.status).toBe(Number(status))
        })
    })
    test('Remover comprovante', ({given, when, then, and})=>{
        given (/^Eu tenho um comprovante com id "(.*)" cadastrado$/, async(id)=>{
            const receipt = await prismaTestClient.receipt.create({
                data:{
                    name: 'João Motta',
                    price: 50.00,
                    amount: 3,
                    product: 'Blusa azul',                    
                }
            })
            expect(receipt.id).toBe(Number(id))
        })
        when(/^Eu envio uma requisição DELETE para a rota \/receipt\/1$/, async(nome, produto, quantidade, preco)=>{
            APIresponse = await request(app).delete('/receipt/1')            
        })
        then(/^o status da resposta deve ser "(.*)"$/, async(status)=>{
            expect(APIresponse.status).toBe(Number(status))
        })
        and(/^o comprovante deve ter sido removido$/, async()=>{
            const hasreceipt = await prismaTestClient.receipt.findMany()
            expect(hasreceipt).toHaveLength(0)
        })
    })
    test('Listar comprovantes', ({given, when, then, and})=>{
        given (/^Eu tenho um comprovante com id "(.*)" cadastrado$/, async(id)=>{
            const receipt = await prismaTestClient.receipt.create({
                data:{
                    name: 'João Motta',
                    price: 50.00,
                    amount: 3,
                    product: 'Blusa azul',                    
                }
            })
            expect(receipt.id).toBe(Number(id))
        })
        when(/^Eu envio uma requisição GET para a rota \/receipt\/1$/, async()=>{
            APIresponse = await request(app).get('/receipt/1')            
        })
        then(/^o status da resposta deve ser "(.*)"$/, async(status)=>{
            expect(APIresponse.status).toBe(Number(status))
        })
        and(/^o corpo da resposta deve conter o comprovante com id "(.*)"$/, async(id)=>{
            expect(APIresponse.body.data.id).toBe(Number(id))
        })
    })
    test('Tentar adicionar um comprovante ao menu geral sem informar todos os campos obrigatórios no banco de dados', ({given, when, then, and})=>{
        given(/^a API solicita os argumentos nome, produto, quantidade, preço como obrigatórios para a criação do item$/, ()=>{})
        when(/^envio uma requisição POST para a rota \/receipt com nome "(.*)" e produto "(.*)"$/, async(nome, produto)=>{
            APIresponse = await request(app).post('/receipt').send({name:nome, product:produto})
        })
        then(/^o status da resposta deve ser "(.*)"$/, async(status)=>{
            expect(APIresponse.status).toBe(Number(status))
        })
        and(/^o corpo da resposta deve conter a mensagem "(.*)"$/, async(mensagem)=>{
            expect(APIresponse.body.message).toBe(mensagem)
        })
    })
})
