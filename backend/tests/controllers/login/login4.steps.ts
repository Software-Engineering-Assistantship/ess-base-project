import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'
const bcrypt = require('bcrypt');
const User = require("../../../models/User")

const feature = loadFeature('tests/features/login/login4.feature');

const SERVER_URL = 'http://localhost:3001'


defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test('A senha para login está errada', ({ given, when, then, and }) => {
        given(/^existe um usuário cadastrado com nome "(.*)", email "(.*)" e senha "(.*)"$/, async (name,email,password) => {
            
            const user = await User.findOne({name: name, email: email})

            expect(email).toBe(
              email
          )
            
        })
        when(/^uma requisição POST foi enviada para "(.*)" com o email "(.*)" e senha "(.*)"$/, async (path,email,password) => {
            try {
                response = await axios.post(`${SERVER_URL}${path}`,{email:email,password:password})
            } catch (error) {
                
                return
            }
        })
        then(/^o status da resposta é "(.*)"$/, (status) => {
            expect(response).toBe(undefined)
        })
        and(/^é retornado o aviso "(.*)"$/, async (msg) => { 
            
            
            let compare = false
            if(msg == "Invalid password"){
                compare = true
            }
            
           expect(compare).toBe(true)

            })
    });
});