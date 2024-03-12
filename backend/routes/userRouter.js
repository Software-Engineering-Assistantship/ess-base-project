const express = require('express');
const router = express.Router();

//criptografia da senha
const bcrypt = require('bcrypt');
// nao tenho certeza se esta certo
const upload = require('../config/multer')

const UserController = require("../controllers/userController")

router.post('/signup', UserController.user_signup)

router.post('/signin', UserController.user_signin)

router.get('/', UserController.getAll)

router.get('/:id', UserController.getUser)

router.put('/edit/:id',  upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }]), UserController.updateUser)

router.put('/editPass/:id', UserController.updatePassword)

router.delete('/delete/:id', UserController.deleteUser)

module.exports = router
