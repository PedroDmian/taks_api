'use struct'

const jwt = require('jsonwebtoken');

let verifyToken = (request, response, next) => {
    let token           = request.get('Authorization');
    let APP_SECRET_PASS = process.env.APP_SECRET_PASS;

    jwt.verify(token, APP_SECRET_PASS, (error, decoded) => {
        if(error)
            return response.status(401).json({
                status: 'error',
                data: null,
                message: 'Usuario no autorizado',
                error,
                request
            });

        request.user = decoded.user;
        next();
    });
}

module.exports = {
    verifyToken
};