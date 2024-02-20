const express = require('express');
const router = express.Router();

//criptografia da senha
const bcrypt = require('bcrypt');
// nao tenho certeza se esta certo


const UserController = require("../controllers/userController")

router.post('/signup',UserController.user_signup)

router.post('/signin',UserController.user_signin)

router.get('/', userController.getAll)

router.get('/:id', userController.getUser)

router.put('/edit/:id', userController.updateUser)

router.put('/editPass/:id', userController.updatePassword)

router.delete('/delete/:id', userController.deleteUser)

module.exports = router
