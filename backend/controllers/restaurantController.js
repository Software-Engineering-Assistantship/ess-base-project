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

    const expectedProperties = ['name', 'address', 'typeOfFood'];

    req.body = JSON.parse(JSON.stringify(req.body))

    console.log(req.body)

    // checa se todas as propriedades obrigatórias estão presentes
    const areAllPropertiesPresent = expectedProperties.every(prop => Object.prototype.hasOwnProperty.call(req.body, prop));

    if (!areAllPropertiesPresent) {
        return res.status(400).json({ error: 'Dados obrigatórios estão incompletos na solicitação' });
    }

    const {street, number, city, neighborhood} = req.body.address

    // checa se já existe um restaurante com mesmo nome e mesmo endereço
    const restaurantExist = await Restaurant.findOne({name : req.body.name, 'address.street': street, 'address.number': number, 'address.city': city, 'address.neighborhood': neighborhood})

    if (restaurantExist) {
        return res.status(400).json({ error: 'Restaurante já cadastrado' });
    } 

    let profileImage = 'Noneundefined'
    let coverImage = 'Noneundefined'

    if(req.files.file1 !== undefined){
        const file1 = req.files.file1[0];
        profileImage = file1.destination + file1.filename
    }

    if(req.files.file2 !== undefined){
        const file2 = req.files.file2[0]; 
        coverImage = file2.destination + file2.filename
    } 

    const {name, address, typeOfFood, site} = req.body

    const restaurant = await Restaurant.create({
        name, 
        address, 
        typeOfFood, 
        site,
        profileImage: profileImage,
        coverImage: coverImage
    })

    res.json(restaurant)
}

const restaurant_edit = async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);

        req.body = JSON.parse(JSON.stringify(req.body))

        console.log(req.body)

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurante não encontrado' });
        }

        const {name, address, typeOfFood, site} = req.body

        // Verificar se os novos dados já existem em outro restaurante
        const restaurantExist = await Restaurant.findOne({ 'name': name, 'address': address });

        if (restaurantExist && restaurantExist._id.toString() !== req.params.id) {
            return res.status(400).json({ error: 'Os dados de endereço e nome do restaurante não podem ser iguais a outro já cadastrado' });
        }

        const restaurantOld = await Restaurant.findById(req.params.id)

        if(req.files.file1 !== undefined){
            const file1 = req.files.file1[0];
            req.body.profileImage = file1.destination + file1.filename
        } else {
            req.body.profileImage = restaurantOld.profileImage
        }

        if(req.files.file2 !== undefined){
            const file2 = req.files.file2[0]; 
            req.body.coverImage = file2.destination + file2.filename
        } else {
            req.body.coverImage = restaurantOld.coverImage
        }

        restaurant.set(req.body);

        // salva os dados 
        await restaurant.save();

        res.json(restaurant);
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar as mudanças no restaurante' });
    }
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
}
