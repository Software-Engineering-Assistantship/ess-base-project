const express = require("express")
const router = express.Router()

const RestaurantController = require("../controllers/restaurantController")

router.get('/', RestaurantController.restaurants_get)

router.get('/:id', RestaurantController.restaurant_profile_get)

router.post('/create', RestaurantController.restaurant_create)

router.put('/edit/:id', RestaurantController.restaurant_edit)

router.delete('/delete/:id', RestaurantController.restaurant_delete)

module.exports = router

