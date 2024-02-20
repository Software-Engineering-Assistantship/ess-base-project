import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
import { PassThrough } from "stream";
const mongoose = require('mongoose')
const User = require("../../../models/User")
const bcrypt = require('bcrypt');

const feature = loadFeature('tests/features/user/user3.feature');

const SERVER_URL = 'http://localhost:3001'

export async function connectDBForTesting() {
    try {
      const dbUri = "mongodb://localhost:27017";
      const dbName = "test";
      await mongoose.connect(dbUri, {
        dbName,
        autoCreate: true,
      });
    } catch (error) {
      console.log("DB connect error");
    }
  }
  
  export async function disconnectDBForTesting() {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.log("DB disconnect error");
    }
  }

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
      });
      afterAll(async () => {
        await disconnectDBForTesting();
      });

    let response: AxiosResponse

    test("Editar senha de perfil com sucesso", ({ given, when, then, and }) => {
        given(/^existe um usuário cadastrado com ID "(.*)" e senha "(.*)"$/, async (iduser, senha) => {
            
            const user = await User.findById(iduser)
            const cpr = await bcrypt.compare(senha, user.password)
            let verify = false

            if(!cpr){
                console.log("Senha não equivalente")
                return
            } else{
                verify = true
            }

            expect(verify).toBe(true)

            if (!user) {
                console.log("Usuário não encontrado")
                return
            }
            
        })
        when(/^uma requisição PUT foi enviada para "(.*)" com a senha atual "(.*)" e nova senha "(.*)"$/, async (path, curSenha, newSenha) => {
            try {
                response = await axios.put(`${SERVER_URL}${path}`, {password: curSenha, newPassword: newSenha})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status da resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^o ID "(.*)" estará associado com a senha "(.*)" no banco de dados$/, async(iduser, senha) => {
            const user = await User.findById(iduser)
            const cpr = bcrypt.compare(senha, user.password)
            let verify = false
            if(cpr){
                verify = true
            }
            expect(verify).toBe(true)
        })
    });
});