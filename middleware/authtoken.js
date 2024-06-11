const multer = require('multer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authtoken = async (req, res, next) => {

    var token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, 'india', async function (err, result) {
        if (err) {
            return res.status(400).json({
                status: false,
                message: "Token is invalid"
            })
        }

        const user = await User.findOne({ token: token });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Token is expire"
            })
        }

        const myuser = await User.findOne({ id: result.id });
        req.user = myuser;
        next();
    })
}

module.exports = authtoken;

