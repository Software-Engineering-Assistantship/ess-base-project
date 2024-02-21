import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const Review = require("../../../models/Review")

const feature = loadFeature('tests/features/reviews/review4.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test('Edição de Review', ({ given, when, then, and }) => {
        given(/^O restaurante de ID "(.*)" contém um review feito pelo usuário de ID "(.*)" e título "(.*)"$/, async (idrest, iduser, title) => {
            
            const review = await Review.findOne({user: iduser, restaurant: idrest, title: title})

            expect(review).toEqual(
              expect.objectContaining({
                  title: title,
              })
          )
            
            
        })
        when(/^é feita uma requisição PUT para "(.*)" alterando o título para "(.*)"$/, async (path, title) => {
            const pathSplit = path.split("/");
            const iduser = pathSplit[3]
            const idrest = pathSplit[2]
            const review  = await Review.findOne({user: iduser, restaurant: idrest})

            try {
                response = await axios.put(`${SERVER_URL}${path}`, {title: title, text: review.text, rating: review.rating, user: iduser, restaurant: idrest})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^O status da resposta deve ser "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^Deve ser retornado um JSON contendo o review "(.*)"$/, async (title) => { 
            expect(response.data).toEqual(
                expect.objectContaining({
                    title: title
                })
            )})
        });
});
