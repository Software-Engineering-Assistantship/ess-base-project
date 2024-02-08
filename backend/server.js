// import required packages
const express = require('express')
const mongoose = require('mongoose')

// import models
const Restaurant = require('./models/Restaurant')

// create express app
const app = express()

// use middleware to parse json
app.use(express.json())

// connect to data base
mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("Connected to data base"))
    .catch(console.error)

// start app 
app.listen(3001, () => console.log("Server started on port 3001"))

// Routes

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find()

    res.json(restaurants)
})

app.post('/restaurants', (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name
    })

    restaurant.save()

    res.json(restaurant)
})

app.put('/restaurant/edit/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }

    restaurant = req.body

    restaurant.save()

    res.json(restaurant)
})

app.delete('/restaurant/delete/:id', async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id)

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }

    res.json(restaurant)
})

