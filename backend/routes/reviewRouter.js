const express = require("express")
const router = express.Router()

const ReviewController = require("../controllers/reviewController")

router.get('/restaurants/:id', ReviewController.review_show)

router.get('/:id', ReviewController.review_get)

router.post('/', ReviewController.review_post)

//router.get('/create', ReviewController.review_post_page)

//router.get('/edit', ReviewController.review_edit_page)

router.put('/:id', ReviewController.review_edit)

router.delete('/:id', ReviewController.review_delete)

module.exports = router
