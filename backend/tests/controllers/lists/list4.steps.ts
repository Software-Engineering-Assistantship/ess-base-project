import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')
const List = require("../../../models/List")
const User = require("../../../models/user")

const feature = loadFeature('tests/features/lists/list4.feature');

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

    test('Editar o nome de uma lista', ({ given, when, then, and }) => {
        given(/^existe uma lista de restaurantes com ID "(.*)" e nome "(.*)" com autor de nome "(.*)"$/, async (idlist, titulo, authorname) => {
            
            const list = await List.findOne({name: titulo, _id: idlist})

            expect(list).toEqual((
                expect.objectContaining({
                    author: authorname
                })
            ))
            
        })
        when(/^uma requisição PUT é enviada para "(.*)" com o novo nome "(.*)"$/, async (path, newname) => {
            try {
                response = await axios.put(`${SERVER_URL}${path}`, {name: newname})
            } catch (error) {
                console.error('Error during HTTP request:', error)
                return
            }
        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^a lista com ID "(.*)" é atualizada com nome "(.*)" no banco de dados$/, async (idlist, newname) =>{
            const list = await List.findById(idlist)
            
            expect(list).toEqual((
                expect.objectContaining({
                    name: newname
                })
            ))
        }) 
            
    });
});
