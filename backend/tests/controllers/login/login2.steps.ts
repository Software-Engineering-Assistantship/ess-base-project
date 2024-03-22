import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'

const User = require("../../../models/User")

const feature = loadFeature('tests/features/login/login2.feature');

const SERVER_URL = 'http://localhost:3001'


defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test('logar o usuário', ({ given, when, then, and }) => {
        given(/^existe um usuário com nome "(.*)", email "(.*)" e senha "(.*)"$/, async (name,email,password) => {
            
            const user = await User.findOne({name: name, email: email})

            expect(email).toBe(
              user.email
          )
            
        })
        when(/^uma requisição POST foi enviada para "(.*)" com o email "(.*)" e senha "(.*)"$/, async (path,email,password) => {
            try {
                response = await axios.post(`${SERVER_URL}${path}`,{email:email,password:password})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^um usuário é logado com nome "(.*)" e email "(.*)"$/, async (name,email) => { 
            const user = await User.findOne({name:name,email:email})
            
            let compare = false
            if(name == user.name){
                compare = true
            }
            
           expect(compare).toBe(true)

            })
    });
});