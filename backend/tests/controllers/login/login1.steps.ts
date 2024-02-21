import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
require("dotenv").config()
import {connectDBForTesting, disconnectDBForTesting} from '../common'
const bcrypt = require('bcrypt');
const User = require("../../../models/User")

const feature = loadFeature('tests/features/login/login1.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test('criar usuário', ({ given, when, then, and }) => {
        given(/^não existe um usuário cadastrado com o nome "(.*)", email "(.*)" e senha "(.*)"$/, async (name,email,password) => {
            
            const user = await User.findOne({name: name, email: email, password: password})

            expect(user).toBe(
              null
          )
            
        })
        when(/^uma requisição POST foi enviada para "(.*)" com o nome "(.*)", email "(.*)" e senha "(.*)"$/, async (path,name,email,password) => {
            try {
                response = await axios.post(`${SERVER_URL}${path}`,{name:name,email:email,password:password})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^um usuário é cadastrado com nome "(.*)", email "(.*)" e senha "(.*)"$/, async (name,email,password) => { 
            const user = await User.findOne({name: name, email: email})
            const verify = await bcrypt.compare(password,user.password)
            let compare = true
            if(!verify){
                compare = false
            }
           expect(compare).toBe(true)

            })
    });
});