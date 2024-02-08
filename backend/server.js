// import required packages
const express = require('express')
const mongoose = require('mongoose')

// import models
const Restaurant = require('./models/Restaurant')

// import controllers
const RestaurantController = require('./controllers/restaurantController')

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

app.get('/restaurants', RestaurantController.restaurants_get)

app.post('/restaurants', RestaurantController.restaurant_post)

app.put('/restaurant/edit/:id', RestaurantController.restaurant_edit)

app.delete('/restaurant/delete/:id', RestaurantController.restaurant_delete)

