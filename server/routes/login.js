'use struct'

const express = require('express');

// ? Controllers
const LoginCtrl = require('../controllers/LoginController');

var App = express();

App.post('/login', LoginCtrl.login);

module.exports = App;