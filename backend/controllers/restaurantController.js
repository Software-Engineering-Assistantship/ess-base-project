const Restaurant = require("../models/Restaurant")
const Picture = require("../models/Picture")

const restaurant_upload = async (req, res) => {
    try {
        const {name} = req.body

        const file = req.file
        const picture = new Picture({
            name,
            src: file.path
        })

        await picture.save()

        res.json({picture, msg:"Imagem salva!"})
    } catch (error) {
        res.status(500).json({ msg:"Erro ao salvar!"})
    }
}

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

    const restaurantExist = await Restaurant.find({'name' : req.body.name, 'address': req.body.address})

    if(restaurantExist.length) {
        res.json({ error: 'Restaurante já cadastrado' })
     } else {
        const restaurant = new Restaurant(req.body)

        restaurant.save()

        res.json(restaurant)
     }
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
