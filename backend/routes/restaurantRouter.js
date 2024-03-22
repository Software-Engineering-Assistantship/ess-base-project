const express = require("express")
const router = express.Router()

const upload = require("../config/multer")

const RestaurantController = require("../controllers/restaurantController")

router.get('/', RestaurantController.restaurants_get)

router.get('/:id', RestaurantController.restaurant_profile_get)

router.post('/create', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), RestaurantController.restaurant_create)

router.put('/edit/:id', upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), RestaurantController.restaurant_edit)

router.delete('/delete/:id', RestaurantController.restaurant_delete)

module.exports = router

