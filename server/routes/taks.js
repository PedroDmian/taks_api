'use struct'

const express = require('express');

// ? Controllers
const TaksCtrl = require('../controllers/TaksController');
const { verifyToken } = require('../middlewares/authentication');

var App = express();

App.get('/prueba', function(request, response) {
    return response.status(200).json({ message: 'Prueba lista'});
});

App.get('/taks/', verifyToken, TaksCtrl.list);
App.post('/taks/save', verifyToken, TaksCtrl.save);
App.put('/taks/update', verifyToken, TaksCtrl.update);
App.delete('/taks/delete/:id', verifyToken, TaksCtrl.deleted);

module.exports = App;