import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const List = require("../../../models/List")
const User = require("../../../models/User")

const feature = loadFeature('tests/features/lists/list3.feature');

const SERVER_URL = 'http://localhost:3001'

import {connectDBForTesting, disconnectDBForTesting} from '../common'
defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test('Tentar criar uma lista sem nome', ({ given, when, then, and }) => {
        given(/^o usuário de ID "(.*)" está logado$/, async (iduser) => {
            
            const user = await User.findById(iduser)

            expect(user).toEqual((
                expect.objectContaining({
                    name: user.name
                })
            ))
            
        })
        when(/^uma requisição POST é enviada para "(.*)" com nenhum nome e descrição "(.*)"$/, async (path, descricao) => {
            try {
                response = await axios.post(`${SERVER_URL}${path}`, {description: descricao})
            } catch (error) {
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(response).toBe(undefined)
        })
        and(/^a lista sem nome não pode ser encontrada no banco de dados com autor de ID "(.*)"$/, async (idautor) =>{
            const user = await User.findById(idautor)
            const list = await List.findOne({author: user.name, name: ""})
            
            expect(list).toBe(null)
        }) 
            
    });
});
