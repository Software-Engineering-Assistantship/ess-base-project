const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get('/', userController.getAll)

router.get('/:id', userController.getUser)

router.put('/edit/:id', userController.updateUser)

router.put('/editPass/:id', userController.updatePassword)

router.delete('/delete/:id', userController.deleteUser)

module.exports = router