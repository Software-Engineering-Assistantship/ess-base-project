import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const List = require("../../../models/List")
const User = require("../../../models/User")

const feature = loadFeature('tests/features/lists/list1.feature');

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

    test('Criar lista com sucesso', ({ given, when, then, and }) => {
        given(/^um usuário de nome "(.*)" está logado com ID "(.*)"$/, async (nameuser, iduser) => {
            
            const user = await User.findOne({_id: iduser, name:nameuser})

            expect(user).toEqual((
                expect.objectContaining({
                    name: nameuser
                })
            ))
            
        })
        when(/^uma requisição POST é enviada para "(.*)" com o nome "(.*)"$/, async (path, title) => {

            try {
                response = await axios.post(`${SERVER_URL}${path}`, {name: title})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^um JSON com o nome do autor "(.*)" e nome da lista "(.*)" é retornado$/, async (nameautor, namelist) =>{
            expect(response.data).toEqual((
                expect.objectContaining({
                    author: nameautor,
                    name: namelist
                })
            ))
        }) 
        and(/^a lista do usuário com ID "(.*)" com nome "(.*)" pode ser encontrada no banco de dados$/, async (userid, title) => { 
            const user = await User.findById(userid)
            const list = await List.findOne({author: user.name, name: title})
           
            expect(list).toEqual(
              expect.objectContaining({
                  name: title,
                  author: user.name
              })
          )})
            
        
    });
});
