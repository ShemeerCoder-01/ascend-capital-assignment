const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {

    try {
        let token;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        console.log(authHeader);
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            console.log(token);
            if (!token) {
                return res.status(401).json({ msg: "Access token is missing." });
            } else {
                console.log(process.env.SECRET_TOKEN);
                jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ msg: "user is not authenticated." });
                    }
                    console.log('decoded token', decoded);
                    next();
                });
                
                // next();
            }
        }
    } catch (err) {
        return res.status(400).json({ msg: "Authorization error!!", err });
    }

};

module.exports = validateToken;