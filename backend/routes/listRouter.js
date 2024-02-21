const express = require("express")
const router = express.Router()

const ListController = require("../controllers/listController")

router.get('/get/:id', ListController.list_get)

router.get('/', ListController.list_get_all)

router.post('/create', ListController.list_create)

router.delete('/delete/:id', ListController.list_delete)

module.exports = router