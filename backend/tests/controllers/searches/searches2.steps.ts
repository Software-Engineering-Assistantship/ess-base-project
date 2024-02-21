import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const Restaurant = require("../../../models/Restaurant")

const feature = loadFeature('tests/features/searches/searches2.feature');

const SERVER_URL = 'http://localhost:3001'

export async function connectDBForTesting() {
    try {
      const dbUri = "mongodb://localhost:27017";
      const dbName = "test";
      await mongoose.connect(dbUri, {
        dbName,
        autoCreate: true,
      });
    } catch (error) {
      console.log("DB connect error");
    }
  }
  
  export async function disconnectDBForTesting() {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.log("DB disconnect error");
    }
  }

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse
    

    test("Busca por restaurante quando não há restaurantes cadastrados", ({ given, when, then, and }) => {
        given('não existem restaurantes cadastrados no banco de dados', async () => {
            // Verifica se não há restaurantes cadastrados no banco de dados
            const restaurants = await Restaurant.find();
            expect(restaurants).toHaveLength(0);
        })
        when(/^é feita uma requisição GET para "(.*)" com nome "(.*)"$/, async (path, name) => {
            try {
                response = await axios.get(`${SERVER_URL}${path}`, { params: { name } });
            } catch (error) {
                return
            }
        })
        then(/^o status da resposta deve ser "(.*)"$/, (arg0) => {
            expect(String(response.status)).toBe(arg0);
        });
        and(/^a resposta é "(.*)"$/, (ans) => { 
            expect(response.data).toEqual(ans)})
    })
})
