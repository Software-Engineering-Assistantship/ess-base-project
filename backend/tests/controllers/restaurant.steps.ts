import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const Restaurant = require("../../models/Restaurant")

const feature = loadFeature('tests/features/restaurant.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    let response: AxiosResponse

    test('Obter restaurante por ID', ({ given, when, then, and }) => {
        given(/^existe um restaurante cadastrado com id "(.*)" e nome "(.*)"$/, async (id, name) => {
            const restaurant = await Restaurant.findB

            if (!restaurant) {
                console.log("Esse restaurante não existe no DB")
                return
            }
        })
        when(/^uma requisição GET foi enviada para "(.*)"$/, async (path) => {
            try {
                response = await axios.get(`${SERVER_URL}${path}`)
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^a resposta contém id "(.*)" e nome "(.*)"$/, (id, name) => { 
            expect(response.data).toEqual(
                expect.objectContaining({
                    _id: id,
                    name: name
                })
            )})
    });
});