'use struct'

const express   = require('express');

var App = express();

// ? Routes
App.use(require('./users'));
App.use(require('./login'));
App.use(require('./taks'));

module.exports = App;