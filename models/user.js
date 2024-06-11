const mongoose = require('mongoose');

const userschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobilenumber: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        },
        work: {
            type: String,
            required: true
        },
        birthdate: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            default: '-'
        }
    },
    { timestamps: true }
)
const User = mongoose.model("users", userschema);

module.exports = User;