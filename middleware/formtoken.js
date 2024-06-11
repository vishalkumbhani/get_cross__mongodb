const jwt = require('jsonwebtoken');
const User = require("../models/user");

async function formtoken(req, res, next) {

    const token = req.body.token;
    console.log(token);

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

        req.user = user;
        next();
    })
}

module.exports = formtoken;