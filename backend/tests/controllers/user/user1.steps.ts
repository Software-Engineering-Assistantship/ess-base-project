import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'
const User = require("../../../models/User")

const feature = loadFeature('tests/features/user/user1.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test("Editar nome de perfil por ID", ({ given, when, then, and }) => {
        given(/^existe um usuário cadastrado com ID "(.*)" e nome "(.*)"$/, async (iduser, nameuser) => {
            
            const user = await User.findById(iduser)

            expect(String(nameuser)).toBe(user.name)
            if(user.name !== nameuser){
                console.log("Nomes não equivalentes")
                return
            }

            if (!user) {
                console.log("Usuário não encontrado")
                return
            }
            
        })
        when(/^uma requisição PUT foi enviada para "(.*)" alterando o nome para "(.*)"$/, async (path, newnameuser) => {
            try {
                response = await axios.put(`${SERVER_URL}${path}`, {name: newnameuser})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status da resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^existe um usuário cadastrado com ID "(.*)" e nome "(.*)" no banco de dados$/, async (iduser, newnameuser) => {
            const user = await User.findById(iduser);
            expect(user).toEqual(
                expect.objectContaining({
                    name: newnameuser,
                })
            )})
    });
});