const express = require("express")
const router = express.Router()

const RestaurantController = require("../controllers/restaurantController")

// necessary to do the search for content
router.get('/', RestaurantController.restaurants_get)

module.exports = router
