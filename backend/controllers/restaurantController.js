const restaurants_get = async (req, res) => {
    const restaurants = await Restaurant.find()

    res.json(restaurants)
}

const restaurant_post = (req, res) => {
    const restaurant = new Restaurant({...req.body })

    restaurant.save()

    res.json(restaurant)
}

const restaurant_edit = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }

    restaurant.set(req.body);

    restaurant.save()

    res.json(restaurant)
}

const restaurant_delete = async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }

    res.json(restaurant)
}

