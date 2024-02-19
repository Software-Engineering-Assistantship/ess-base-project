// import required packages
const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

// import models
const Restaurant = require('./models/Restaurant')
const User = require('./models/User')

// import controllers
const RestaurantController = require('./controllers/restaurantController')
const UserController = require('./controllers/userController')
const followersController = require('./controllers/followersController')
const ReviewController = require('./controllers/reviewController')

// import routers
const restaurantRouter = require("./routes/restaurantRouter")
const userRouter = require("./routes/userRouter")
const followersRouter = require("./routes/followersRouter")
const reviewRouter = require("./routes/reviewRouter")
const ratingRouter = require("./routes/ratingRouter")

// use the PORT in .env or 3000 if it does not exist
const port = process.env.PORT || 3000

// create express app
const app = express()

// use middleware to parse json
app.use(express.json())

// connect to data base
const run = async () => {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`);
    console.log("Connected to data base")
}
    
run()
.catch((err) => console.error(err))


// start app 
app.listen(port, () => console.log("Server started on port 3001"))

// Routes
app.use("/restaurants", restaurantRouter)
app.use("/users", userRouter)
app.use("/users", followersRouter)
app.use("/reviews", reviewRouter)
app.use("/ratings", ratingRouter)
