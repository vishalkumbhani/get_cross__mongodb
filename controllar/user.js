const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const InsertUser = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.email || !data.mobilenumber || !data.gender || !data.work || !data.birthdate || !data.password) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        var user = await User.findOne({ email: data.email });
        if (user) {
            return res.status(200).json({
                status: false,
                message: "Email already exists"
            });
        }

        var user = await User.findOne({ mobilenumber: data.mobilenumber });
        if (user) {
            return res.status(200).json({
                status: false,
                message: "mobilenumber already exists"
            });
        }

        const newpassword = await bcrypt.hash(data.password, 10);
        const obj = { ...data, password: newpassword }
        const result = await User.create(obj);
        res.status(201).json({
            status: true,
            message: "User created successfully",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }

        const data = req.body;
        if (data.password) {
            const newpassword = await bcrypt.hash(data.password, 10);
            const obj = { ...data, password: newpassword };
            const result = await User.updateOne({ _id: id }, { $set: obj });
            return res.status(200).json({
                status: true,
                message: "User Upadated Successfully",
                data: result
            })
        }

        const result = await User.updateOne({ _id: id }, { $set: data });
        return res.status(200).json({
            status: true,
            message: "User Upadated Successfully",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllUser = async (req, res) => {
    try {
        const result = await User.find({}).select('name email');
        res.status(200).json({
            status: true,
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }
        const obj = { ...user.toObject(), password: null, token: null }
        res.status(200).json({
            status: true,
            data: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }

        const result = await User.deleteOne(user);
        res.status(200).json({
            status: true,
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}

const ChangePasswordOfUserById = async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }

        const password = await bcrypt.compare(data.oldpassword, user.password);
        if (!password) {
            return res.status(404).json({
                status: false,
                message: "Password not matched"
            })
        }

        const newpassword = await bcrypt.hash(data.newpassword, 10);
        const result = await User.updateOne({ _id: data._id }, { $set: { password: newpassword } });
        res.status(200).json({
            status: true,
            message: "Password updated successfully",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const ChangePasswordOfUserByToken = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user;

        const password = await bcrypt.compare(data.oldpassword, user.password);
        if (!password) {
            return res.status(404).json({
                status: false,
                message: "Password not matched"
            })
        }

        const newpassword = await bcrypt.hash(data.newpassword, 10);
        const result = await User.updateOne(
            { _id: user._id },
            { $set: { password: newpassword } });
        res.status(200).json({
            status: true,
            message: "Password updated successfully",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const LoginUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(200).json({
                status: false,
                message: "Email not matched"
            })
        }

        const password = await bcrypt.compare(data.password, user.password);
        if (!password) {
            return res.status(200).json({
                status: false,
                message: "Password not matched"
            })
        }

        const token = jwt.sign({ id: user._id }, "india", { expiresIn: '1h' })
        const result = await User.updateOne({ _id: user._id }, { $set: { token: token } })
        const obj = { ...user.toObject(), token: null, password: null }
        res.status(200).json({
            status: true,
            message: "Log in successfuuly",
            data: obj,
            token: token
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetUserProfileBYJson = async (req, res) => {
    try {
        const user = req.user
        const obj = { ...user.toObject(), password: null, token: null }
        res.status(200).json({
            status: true,
            data: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetUserProfileBYForm = async (req, res) => {
    try {
        const user = req.user
        const obj = { ...user.toObject(), password: null, token: null }
        res.status(200).json({
            status: true,
            data: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetUserProfileBYAuthrozation = async (req, res) => {
    try {
        const user = req.user
        const obj = { ...user.toObject(), password: null, token: null }
        res.status(200).json({
            status: true,
            data: obj
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const SearchUser = async (req, res) => {
    try {
        const key = req.params.key;
        const data = await User.find({
            "$and": [
                { "name": { $regex: key } },
                { "work": { $regex: key } }
            ]
        });
        res.status(200).json({
            status: true,
            data: data
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const SearchUserByJson = async (req, res) => {
    try {
        const key = req.body.key;
        const data = await User.find({
            "$and": [
                { "name": { $regex: key } },
                { "work": { $regex: key } }
            ]
        })
        res.status(200).json({
            status: true,
            data: data
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}

const GetUserByQueryString = async (req, res) => {
    try {
        const name = req.query.name;
        const data = await User.find({ name: name })
        res.status(200).json({
            status: true,
            data: data
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    InsertUser,
    UpdateUser,
    GetAllUser,
    GetSingleUser,
    DeleteUser,
    ChangePasswordOfUserById,
    ChangePasswordOfUserByToken,
    LoginUser,
    GetUserProfileBYJson,
    GetUserProfileBYForm,
    GetUserProfileBYAuthrozation,
    SearchUser,
    SearchUserByJson,
    GetUserByQueryString
}

