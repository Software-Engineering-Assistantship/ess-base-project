import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const Review = require("../../../models/Review")

const feature = loadFeature('tests/features/reviews/review2.feature');

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

    test('Criar Review', ({ given, when, then, and }) => {
        given(/^Não existe review feito pelo usuário de ID "(.*)" no restaurante de ID "(.*)"$/, async (idrest, iduser) => {
            
            const review = await Review.findOne({user: iduser, restaurant: idrest})

            expect(review).toBe(null)
            
        })
        when(/^Uma requisição POST é feita para "(.*)" com título "(.*)", texto "(.*)" e nota "(.*)"$/, async (path, title, text, rating) => {
            const pathSplit = path.split("/");
            const iduser = pathSplit[3]
            const idrest = pathSplit[2]
            
            try {
                response = await axios.post(`${SERVER_URL}${path}`, {title: title, text: text, rating: rating, user: iduser, restaurant: idrest})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^O status da resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^O review "(.*)" associada ao usuário "(.*)" e restaurante "(.*)" está no banco de dados$/, async (title, iduser, idrest) => { 
            const review = await Review.findOne({title: title, user: iduser, restaurant: idrest})
           
            expect(review).toEqual(
              expect.objectContaining({
                  title: title,
              })
          )})
            
        
    });
});
