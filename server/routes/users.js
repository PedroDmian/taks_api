'use struct'

const express = require('express');

// ? Controllers
const UserCtrl = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/authentication');

var App = express();

App.get('/users/', verifyToken, UserCtrl.list);
App.post('/users/save', UserCtrl.save);
App.put('/users/update', verifyToken, UserCtrl.update);
App.delete('/users/delete/:id', verifyToken, UserCtrl.deleted);

module.exports = App;