const Restaurant = require("../models/Restaurant")

const restaurants_get = async (req, res) => {
    const restaurants = await Restaurant.find()

    if (restaurants.length === 0) {
        return res.status(404).json({ error: 'Ainda não há restaurantes cadastrados' })
    }else{
        res.json(restaurants)
    }
}

restaurant_profile_get  = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }
    else{
        res.json(restaurant)
    }
}

const restaurant_create = async (req, res) => {

    const expectedProperties = ['name', 'address', 'typeOfFood', 'site'];

    // checa se todas as propriedades obrigatórias estão presentes
    const areAllPropertiesPresent = expectedProperties.every(prop => req.body.hasOwnProperty(prop));

    if (!areAllPropertiesPresent) {
        return res.status(400).json({ error: 'Dados obrigatórios estão incompletos na solicitação' });
    }

    // checa se já existe um restaurante com mesmo nome e mesmo endereço
    const restaurantExist = await Restaurant.find({'name' : req.body.name, 'address': req.body.address})

    if (restaurantExist.length) {
        return res.status(400).json({ error: 'Restaurante já cadastrado' });
    }

    const {destination} = req.file || { destination: 'None' }
    const {name, address, typeOfFood, site} = req.body

    const restaurant = await Restaurant.create({
        name, 
        address, 
        typeOfFood, 
        site,
        profileImage: destination
    })

    res.json(restaurant)
}


const restaurant_edit = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id, req.body)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    } 

    const {name, address} = req.body

    // Verificar se os novos dados já existem em outro restaurante
    const restaurantExist = await Restaurant.findOne({'name' : name, 'address': address})

    if(restaurantExist && restaurantExist._id.toString() !== req.params.id){
        return res.json({ error: 'Os dados de endereço e nome do restaurante não podem ser iguais a outro já cadastrado' })
    }

    // Atualizar os dados do restaurante
    restaurant.set(req.body)
    res.json(restaurant)
}

const restaurant_delete = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }else{
        res.json(restaurant)
    }
}

module.exports = {
    restaurants_get,
    restaurant_profile_get,
    restaurant_create,
    restaurant_edit,
    restaurant_delete,
    restaurant_upload
}
