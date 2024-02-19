import { defineFeature, loadFeature } from 'jest-cucumber';
import axios, { AxiosResponse } from 'axios';
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)
    .then(() => console.log("Connected to data base"))
    .catch(console.error)

const User = require('../../models/User.js');
const feature = loadFeature('tests/features/followers/seguirUsuarios.feature');
const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {
    
    let response: AxiosResponse
    let user1: typeof User
    let user2: typeof User

    test('Seguir um usuário', ({ given, when, then }) => {
        given(/^o usuário com id "(.*)" está armazenado no sistema com a lista de usuários que segue vazia$/, async (id) => {
            user1 = {
                "_id": id,
                "following": []
            }
        });

        given(/^o usuário com o id "(.*)" está armazenado no sistema com a lista de seguidores vazia e com e-mail "(.*)"$/, 
        async (id, email) => {
            user2 = {
                "_id": id,
                "followers": [],
                "email": email
            }
        });

        when(/^fizer uma requisição PUT com rota "(.*)" e o body contendo o id "(.*)"$/, async (path, id_follower) => {
            try {
                response = await axios.put(`${SERVER_URL}${path}`, {_id: id_follower})
                console.log(response)
            } catch (error) {
                console.log('Error during HTTP request:', error)
            }
        });

        then(/^o status do sistema é (\d+)$/, async (status) => {
            expect(response.status).toBe(Number(status))

        });

        then(/^retorna um JSON com os dados do usuário com o id "(.*)" que tem a lista de seguidores "(.*)"$/, async (id_followed, list_followers) => {
            expect(response.data.followed.id).toBe(id_followed)
            expect(response.data.followed.followers).toEqual(expect.arrayContaining([list_followers]))
        });

        then(/^com os dados do usuário com id "(.*)" tem a lista de usuários que segue "(.*)"$/, async (id_follower, list_following) => {
            expect(response.data.follower.id).toBe(id_follower)
    expect(response.data.follower.following).toEqual(expect.arrayContaining([list_following]))
        });
        
        then(/^a mensagem enviada para o e-mail cadastrado do usuário seguido tem status "(.*)"$/, async (email_status) => {
            expect(response.data.status_email).toBe(email_status)
        });
    });
  });