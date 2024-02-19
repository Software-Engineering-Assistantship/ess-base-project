import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const Review = require("../../../models/Review")
const Rating = require("../../../models/Rating")

const feature = loadFeature('tests/features/reviews/review3.feature');

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

    test('Obter Média de Notas de um Restaurante', ({ given, when, then, and }) => {
        given(/^O restaurante de ID "(.*)" contém três notas dadas em reviews: "(.*)" pelo user "(.*)", "(.*)" pelo user "(.*)" e "(.*)" pelo user "(.*)"$/, async (idrest, rating1, user1, rating2, user2, rating3, user3) => {
            const rat1 = await Rating.findOne({restaurant: idrest, user: user1})
            const rat2 = await Rating.findOne({restaurant: idrest, user: user2})
            const rat3 = await Rating.findOne({restaurant: idrest, user: user3})

            if (!rat1 || !rat2 || !rat3) {
                console.log("Alguns das notas não existe no DB")
                return
            }

        })
        when(/^Uma requisição GET é feita para "(.*)"$/, async (path) => {
            try {
                response = await axios.get(`${SERVER_URL}${path}`)
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^O status de resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^A resposta deve ser média "(.*)"$/, async (average) => { 
            expect(response.data).toBe(average)
        });
    });
});
