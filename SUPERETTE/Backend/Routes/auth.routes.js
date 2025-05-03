const express = require('express');
const route = express.Router();
const authController = require('../Controllers/auth.Controller');

route.post('/login', authController.login);
route.get('/check-auth', authController.checkAuth);
route.post('/logout', authController.logout);

module.exports = route;
