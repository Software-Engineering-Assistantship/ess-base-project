const express = require("express")
const router = express.Router()

const FollowerController = require("../controllers/followersController")

router.get('/', FollowerController.users_get)

router.get('/:id', FollowerController.user_profile_get)

router.get('/:id/followers', FollowerController.user_followers_get)

router.get('/:id/following', FollowerController.user_following_get)

router.put('/:id/follow', FollowerController.user_follow)

router.put('/:id/unfollow', FollowerController.user_unfollow)

router.post('/login', FollowerController.user_create)

router.delete('/delete/:id', FollowerController.user_delete)

module.exports = router