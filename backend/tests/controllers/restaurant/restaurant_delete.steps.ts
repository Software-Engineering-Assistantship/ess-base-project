import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const Restaurant = require("../../../models/Restaurant")

const feature = loadFeature('tests/features/restaurant/restaurant_delete.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });

    let response: AxiosResponse

    test('Deletar restaurante por ID', ({ given, when, then, and }) => {
        given(/^existe um restaurante cadastrado com id "(.*)" e nome "(.*)"$/, async (id, name) => {
            const restaurant = await Restaurant.findById(id)

            expect(restaurant.name).toBe(name)
        })
        when(/^uma requisição DELETE foi enviada para "(.*)"$/, async (path) => {
            response = await axios.delete(`${SERVER_URL}${path}`)
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^não existe um restaurante cadastrado com id "(.*)" e nome "(.*)"$/, async (id, name) => { 
            const restaurant = await Restaurant.findById(id)

            expect(restaurant).toBeNull()
        })
    })
})