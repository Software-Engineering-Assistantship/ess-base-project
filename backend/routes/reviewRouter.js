const express = require("express")
const router = express.Router()

const ReviewController = require("../controllers/reviewController")

router.get('/', ReviewController.registered_reviews)

router.get('/:idrest', ReviewController.review_show)

router.get('/:idrest/:iduser', ReviewController.review_get)

router.post('/:idrest/:iduser', ReviewController.review_post)

//router.get('/create', ReviewController.review_post_page)

//router.get('/edit', ReviewController.review_edit_page)

router.put('/:idrest/:iduser', ReviewController.review_edit)

router.delete('/:idrest/:iduser', ReviewController.review_delete)

router.get('/user/:iduser', ReviewController.review_user)

module.exports = router
