'use struct'

// ? Lib
const dotenv   = require('dotenv').config();

const ConnectDB = require('./config/database');
const App       = require('./config/service');
const APP_PORT  = process.env.PORT || 3000;

process.env.APP_EXPIRATION  = 60 * 60 * 24 * 30;

ConnectDB().then((response) => {
    
    console.log('Success Connection', { response });

    App.listen(APP_PORT, () => {
        console.log(`Success Server ApiRest ${ process.env.APP_URL }:${ APP_PORT }`);
    });
});