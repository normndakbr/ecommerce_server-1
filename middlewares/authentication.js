const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(request, response, next) {
    //console.log(request.headers);
    const { access_token } = request.headers;
    
    try {
        if(!access_token) {
            throw { name: 'AuthenticationFailed' }
        }else {
            //console.log("TOKEN", token);
            const decoded = verifyToken(access_token);
            //console.log("DECODE", decoded);
            const user = await User.findOne({ 
                    where: { email: decoded.email }
            });
            
            if(!user) {
                throw { name: 'AuthenticationFailed' }
            }else {
                request.loggedInUser = decoded;
                next();
            }  
        }
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;