const express = require("express")
const router = express.Router()

const FeedController = require("../controllers/feedController")

// necessary to show trending and most viewed reviews
router.get("/reviews/likes", FeedController.get_likes);
router.get("/reviews/views", FeedController.get_views);

module.exports = router;
