import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const Restaurant = require("../../../models/Restaurant")

const feature = loadFeature('tests/features/searches/searches1.feature');

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
    
    test("Busca por restaurante", ({ given, when, then, and }) => {
        given(/^existe um restaurante cadastrado com nome "(.*)" e outro com nome "(.*)"$/, async (substring) => {
            await Restaurant.create({ name: `Restaurante ${substring} Teste` });
        })
        when(/^é feita uma requisição GET para "(.*)" com nome "(.*)"$/, async (path, name) => {
            try {
              response = await axios.get(`${SERVER_URL}${path}`, { params: { name } });
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status da resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^a resposta é "(.*)"$/, (ans) => { 
            expect(response.data).toEqual(ans)})
    })
})
