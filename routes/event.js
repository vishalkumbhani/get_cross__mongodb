const express = require('express');
const eventroutes = express.Router();
const eventimage = require("../middleware/eventimg");
const {
    InsertEvent,
    UpadateEvent,
    GetAllEvent,
    GetSingleEvent,
    DeleteEvent,
    ChangeEventStatus } = require("../controllar/event")


eventroutes.post('/', eventimage.single('image'), InsertEvent);
eventroutes.patch('/:id', eventimage.single('image'), UpadateEvent);
eventroutes.get('/', GetAllEvent);
eventroutes.get('/:id', GetSingleEvent);
eventroutes.delete('/:id', DeleteEvent);
eventroutes.patch('/upadate/:id', ChangeEventStatus);

module.exports = eventroutes;