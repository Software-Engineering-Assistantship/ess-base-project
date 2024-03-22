import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const User = require('../../../models/User.js');
const feature = loadFeature('tests/features/followers/listFollowers.feature');
const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {
    
    let response: AxiosResponse
    let user1: typeof User
    let user2: typeof User
    let user3: typeof User
    let user4: typeof User

    beforeAll(async () => {
        await connectDBForTesting();
    });
      afterAll(async () => {
        await disconnectDBForTesting();
    });

    test('Pegar lista de seguidores', ({ given, when, then }) => {
        given(/^o usuário com id "(.*)" está armazenado no sistema com a lista de seguidores "(.*)", "(.*)", "(.*)"$/, 
        async (id1, id2, id3, id4) => {
            let user1 = await User.findByIdAndUpdate(
                {_id: id1}, 
                {followers: [id2, id3, id4]}, 
                {new: true}
            )
            let user2 = await User.findByIdAndUpdate(
                {_id: id2}, 
                {following: [id1]}, 
                {new: true}
            )
            let user3 = await User.findByIdAndUpdate(
                {_id: id3}, 
                {following: [id1]}, 
                {new: true}
            )
            let user4 = await User.findByIdAndUpdate(
                {_id: id4}, 
                {following: [id1]}, 
                {new: true}
            )
        });

        when(/^fizer uma requisição GET com rota "(.*)"$/, async (path) => {
            try {
                response = await axios.get(`${SERVER_URL}${path}`)
            } catch (error) {
                console.log('Error during HTTP request:', error)
            }
        });

        then(/^o status do sistema é (\d+)$/, async (status) => {
            expect(response.status).toBe(Number(status))

        });

        then(/^o sistema retorna um JSON com a lista "(.*)", "(.*)", "(.*)"$/, 
        async (id1, id2, id3) => {
            expect(response.data).toEqual(expect.arrayContaining([id1, id2, id3]))
        });
    });
})