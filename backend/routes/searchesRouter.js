const express = require("express")
const router = express.Router()

const SearchController = require("../controllers/searchesController")

// necessary to do the search for content
router.get('/search_restaurant', SearchController.search_get)

module.exports = router
