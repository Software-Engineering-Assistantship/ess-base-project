import { loadFeature, defineFeature } from "jest-cucumber"
import axios, { AxiosResponse } from 'axios'
const mongoose = require('mongoose')

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

const Restaurant = require("../../../models/Restaurant")

const feature = loadFeature('tests/features/restaurant/restaurant_create_error.feature');

const SERVER_URL = 'http://localhost:3001'

defineFeature(feature, test => {

    beforeAll(async () => {
        await connectDBForTesting();
    });

    afterAll(async () => {
        await disconnectDBForTesting();
    });

    let response: AxiosResponse

    test('erro ao cadastrar restaurante existente', ({ given, when, then, and }) => {
        given(/^existe um restaurante cadastrado com nome "(.*)" e endereço "(.*)"$/, async (name, addr) => {
            const restaurant = await Restaurant.findOne({name : name, address: addressSeparation(addr)})

            expect(restaurant).not.toBeNull()
        })
        when(/^uma requisição POST foi enviada para "(.*)" com nome "(.*)", endereço "(.*)" e tipo de comida "(.*)"$/, async (path, name, addr, typeOfFood) => {

            const addressInfo = addressSeparation(addr)

            if (addressInfo !== null) {
                const { street, number, neighborhood, city } = addressInfo
                
                    response = await axios.post(`${SERVER_URL}${path}`, {
                        name: name,
                        typeOfFood: typeOfFood,
                        address: {
                            street, 
                            number, 
                            neighborhood, 
                            city
                        }
                    })
            }

        })
        then(/^o status de resposta é "(.*)"$/, (status) => {
            expect(String(response.status)).toBe(status)
        })
        and(/^a resposta é "(.*)"$/, (ans) => { 
            expect(response.data).toEqual(ans)})
    })
})

function addressSeparation(addr: string) {
    // Expressão regular para extrair a rua, número, bairro e cidade
    var regex = /(.+),\s*(\d+)\s*-\s*(.+),\s*(.+)/;
    
    // Executar a expressão regular no endereço fornecido
    var match = addr.match(regex);
    
    // Verificar se houve correspondência
    if (match) {
        // Extrair os grupos correspondentes e retornar o objeto
        return {
            street: match[1].trim(),
            number: match[2].trim(),
            neighborhood: match[3].trim(),
            city: match[4].trim()
        };
    } else {
        // Se não houver correspondência, retornar null ou tratar conforme necessário
        return null;
    }
}