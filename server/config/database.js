const mongoose = require('mongoose');

// ? Globas Var's
const APP_ENV = process.env.NODE_ENV;

let PATH_MONGOOSE   = '';

if(APP_ENV == 'production') {
    PATH_MONGOOSE = process.env.DB_HOST_PROD + '/' + process.env.DB_DATABASE_PROD || 'mongodb+srv://Dmian:ddRiC2Cj90QQBfMJ@cluster0-sgs5e.mongodb.net/taksDB';
} else {
    PATH_MONGOOSE = process.env.DB_HOST + process.env.DB_PORT + '/' + process.env.DB_DATABASE || 'mongodb://localhost:27017/PruebaExamen';
}

console.log( {app_mongoose: PATH_MONGOOSE, app_env: APP_ENV });

const ConnectDB = async () => {
    try {
        await mongoose.connect(PATH_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

        return { error: false, message: 'DB Run example success' };
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = ConnectDB;