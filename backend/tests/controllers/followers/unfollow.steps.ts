import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const User = require('../../../models/User.js');
const feature = loadFeature('tests/features/followers/unfollow.feature');
const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    let response: AxiosResponse
    let user1: typeof User
    let user2: typeof User

    beforeAll(async () => {
        await connectDBForTesting();
    });
      afterAll(async () => {
        await disconnectDBForTesting();
    });
    

    test('Deixar de seguir um usuário', ({ given, when, then }) => {
        given(/^o usuário com id "(.*)" está armazenado no sistema com a lista de usuários que segue "(.*)"$/, async (id_following, id_followed) => {
            let user1 = await User.findByIdAndUpdate(
                {_id: id_following}, 
                {following: [id_followed]}, 
                {new: true}
            )
        });

        given(/^o usuário com o id "(.*)" está armazenado no sistema com a lista de seguidores "(.*)"$/, 
        async (id_followed, id_following) => {
            let user2 = await User.findByIdAndUpdate(
                {_id: id_followed}, 
                {followers: [id_following]}, 
                {new: true}
            )
        });

        when(/^fizer uma requisição PUT com rota "(.*)" e o body contendo o id "(.*)"$/, async (path, id_follower) => {
            try {
                response = await axios.put(`${SERVER_URL}${path}`, {_id: id_follower})
            } catch (error) {
                console.log('Error during HTTP request:', error)
            }
        });

        then(/^o status do sistema é (\d+)$/, async (status) => {
            expect(response.status).toBe(Number(status))

        });

        then(/^retorna um JSON contendo o id "(.*)" e a lista de seguidores vazia$/, async (id_followed) => {
            expect(response.data.unfollowed.id).toBe(id_followed)
            expect(response.data.unfollowed.followers).toEqual([])
        });

        then(/^contendo o id "(.*)" e a lista de usuários que segue vazia$/, async (id_follower) => {
            expect(response.data.unfollower.id).toBe(id_follower)
            expect(response.data.unfollower.following).toEqual([])
        });
    });
  });