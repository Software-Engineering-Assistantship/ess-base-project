const express = require("express")
const router = express.Router()

const upload = require("../config/multer")

const ListsController = require("../controllers/listController")

router.get('/', ListsController.list_get_all)

router.get('/:id', ListsController.list_get)

router.put('/edit/:id', ListsController.list_edit)

router.post('/create/:id', ListsController.list_create)

router.delete('/delete/:id', ListsController.list_delete)

module.exports = router
