const express = require('express');
const router = express.Router();

//criptografia da senha
const bcrypt = require('bcrypt');
// nao tenho certeza se esta certo


const UserController = require("../controllers/userController")
router.post('/signup',UserController.user_signup)

router.post('/signin',UserController.user_signin)



module.exports = router;
