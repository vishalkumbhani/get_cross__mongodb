const express = require('express');
const userroutes = express.Router();
const multer = require('multer');
const upload = multer();
const jsontoken = require('../middleware/jsontoken');
const formtoken = require('../middleware/formtoken');
const authtoken = require('../middleware/authtoken');

const {
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
    GetUserByQueryString } = require('../controllar/user');

userroutes.post('/', InsertUser)
userroutes.patch('/:id', UpdateUser)
userroutes.get('/', GetAllUser)
userroutes.get('/:id', GetSingleUser)
userroutes.delete('/:id', DeleteUser)
userroutes.patch('/change/password', ChangePasswordOfUserById)
userroutes.patch('/token/password', authtoken, ChangePasswordOfUserByToken)
userroutes.post('/login', LoginUser)
userroutes.get('/by/json', jsontoken, GetUserProfileBYJson)
userroutes.post('/by/form', upload.none(), formtoken, GetUserProfileBYForm)
userroutes.get('/by/Authrozation', authtoken, GetUserProfileBYAuthrozation)
userroutes.get('/search/:key', SearchUser)
userroutes.post('/search', SearchUserByJson)
userroutes.get('/search/my/name', GetUserByQueryString)

module.exports = userroutes;