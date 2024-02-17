const express = require("express")
const router = express.Router()

const RatingController = require("../controllers/ratingController")

router.post('/', RatingController.rating_post)

router.get('/restaurants/:id/avg', RatingController.rating_avg)

router.get('/restaurants/:id/', RatingController.rating_list)

router.get('/:id', RatingController.rating_get)

module.exports = router
