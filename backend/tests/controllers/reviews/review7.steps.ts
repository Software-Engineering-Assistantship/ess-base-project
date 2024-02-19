import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const Review = require("../../../models/Review")
const User = require("../../../models/User")

const feature = loadFeature('tests/features/reviews/review7.feature');

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

    test('Visualizar Reviews a partir de um user', ({ given, when, then, and }) => {
        given(/^O usuário de ID "(.*)" contém dois reviews feitos "(.*)" e "(.*)"$/, async (iduser, title1, title2) => {
            
            const rev1 = await Review.findOne({user: iduser, title: title1});
            const rev2 = await Review.findOne({user: iduser, title: title2});

            expect(rev1).toEqual(
              expect.objectContaining({
                  title: title1
              })
            )

            expect(rev2).toEqual(
                expect.objectContaining({
                    title: title2
                })
            )
            
            
        })
        when(/^É feita uma requisição GET para "(.*)"$/, async (path) => {
            try {
                response = await axios.get(`${SERVER_URL}${path}`)
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^O status da resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^Deve retornar um JSON contendo os dois reviews "(.*)" e "(.*)"$/, async (title1, title2) => { 
            expect(response.data[0]).toEqual(
                expect.objectContaining({
                    title: title1
                })
            )

            expect(response.data[1]).toEqual(
                expect.objectContaining({
                    title: title2
                })
            )
        });
    });
});
