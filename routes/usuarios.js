const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsuariosController = require('../controllers/usuarios-controller');

//Cadastro do usuário
router.post('/cadastro', UsuariosController.cadastroUsuario);

//Login do usuário
router.post('/login', UsuariosController.loginUsuario);

module.exports = router;