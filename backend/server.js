// import required packages
const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

// import models
const Restaurant = require('./models/Restaurant')
const User = require('./models/User')

// import controllers
const RestaurantController = require('./controllers/restaurantController')
const followersController = require('./controllers/followersController')

// import routers
const restaurantRouter = require("./routes/restaurantRouter")
const followersRouter = require("./routes/followersRouter")

// use the PORT in .env or 3000 if it does not exist
const port = process.env.PORT || 3000

// create express app
const app = express()

// use middleware to parse json
app.use(express.json())

// connect to data base
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)
    .then(() => console.log("Connected to data base"))
    .catch(console.error)

// start app 
app.listen(port, () => console.log("Server started on port 3001"))

// Routes
app.use("/restaurants", restaurantRouter)
app.use("/users", followersRouter)

