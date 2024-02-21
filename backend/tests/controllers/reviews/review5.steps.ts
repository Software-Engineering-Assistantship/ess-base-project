import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const Review = require("../../../models/Review")

const feature = loadFeature('tests/features/reviews/review5.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });
    let response: AxiosResponse

    test('Remoção de Review', ({ given, when, then, and }) => {
        given(/^O restaurante de ID "(.*)" contém um review feito pelo usuário de ID "(.*)" e título "(.*)"$/, async (idrest, iduser, title) => {
            
          const review = await Review.findOne({user: iduser, restaurant: idrest, title: title})

          expect(review).toEqual(
            expect.objectContaining({
                title: title,
            })
        )
            
            
        })
        when(/^é feita uma requisição DELETE para "(.*)"$/, async (path) => {
            try {
                response = await axios.delete(`${SERVER_URL}${path}`)
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^O status da resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^O review "(.*)" do restaurante de ID "(.*)" e usuário de ID "(.*)" não deve constar no banco de dados$/, async (title, idrest, iduser) => { 
          const review = await Review.findOne({user: iduser, restaurant: idrest, title: title})  
          
          expect(review).toEqual(null)
        });
    });
});
