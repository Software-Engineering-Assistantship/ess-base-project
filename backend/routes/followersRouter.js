const express = require("express")
const router = express.Router()

const FollowerController = require("../controllers/followersController")

router.get('/followers/:id', FollowerController.user_followers_get)

router.get('/following/:id', FollowerController.user_following_get)

router.put('/follow/:idp/:idl', FollowerController.user_follow)

router.put('/unfollow/:idp/:idl', FollowerController.user_unfollow)

module.exports = router