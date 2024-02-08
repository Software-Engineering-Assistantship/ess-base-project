// import required packages
const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

// import models
const Restaurant = require('./models/Restaurant')

// import controllers
const RestaurantController = require('./controllers/restaurantController')

// use the PORT in .env or 3000 if it does not exist
const port = process.env.PORT || 3000

// create express app
const app = express()

// use middleware to parse json
app.use(express.json())

// connect to data base
mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("Connected to data base"))
    .catch(console.error)

// start app 
app.listen(port, () => console.log("Server started on port 3001"))

// Routes

app.get('/restaurants', RestaurantController.restaurants_get)

app.get('/restaurant/:id', RestaurantController.restaurant_profile_get)

app.post('/restaurants', RestaurantController.restaurant_create)

app.put('/restaurant/edit/:id', RestaurantController.restaurant_edit)

app.delete('/restaurant/delete/:id', RestaurantController.restaurant_delete)

