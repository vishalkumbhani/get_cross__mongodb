const express = require('express');
const helpdeskroutes = express.Router();
const helpdeskimage = require('../middleware/helpdeskimg');

const {
    InsertCategory,
    UpadateCategory,
    GetAllCategory,
    GetSingleCategory,
    DeleteCategory } = require('../controllar/helpdesk');

helpdeskroutes.post('/', helpdeskimage.single('categoryimage'), InsertCategory);
helpdeskroutes.patch('/:id', helpdeskimage.single('categoryimage'), UpadateCategory);
helpdeskroutes.get('/', GetAllCategory);
helpdeskroutes.get('/:id', GetSingleCategory);
helpdeskroutes.delete('/:id', DeleteCategory);


module.exports = helpdeskroutes;