const express = require("express")
const router = express.Router()

const FeedController = require("../controllers/feedController")

// necessary to show random restaurants
router.get("/random_restaurants", FeedController.get_random_restaurants);

// necessary to show random reviews
router.get("/random_reviews", FeedController.get_random_reviews);

// necessary to show 5 most liked reviews
router.get("/most_liked_reviews", FeedController.get_most_liked_reviews);

module.exports = router
