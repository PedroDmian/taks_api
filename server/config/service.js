'use struct'

const express   = require('express');
const bodyParse = require('body-parser');

var App = express();

App.use(bodyParse.urlencoded({extended: false}));
App.use(bodyParse.json());

// ? Headers

// ? Route Inicial
App.use('/api', require('../routes/route'));

module.exports = App;