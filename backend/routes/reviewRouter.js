const express = require("express")
const router = express.Router()

const ReviewController = require("../controllers/reviewController")

router.get('/:idrest', ReviewController.review_show)

router.get('/:idrest/:iduser', ReviewController.review_get)

router.post('/:idrest/:iduser/create', ReviewController.review_post)

router.put('/:idrest/:iduser/edit', ReviewController.review_edit)

router.delete('/:idrest/:iduser/delete', ReviewController.review_delete)

router.get('/user/:iduser', ReviewController.review_user)

module.exports = router
