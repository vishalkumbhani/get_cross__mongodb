const express = require('express');
const contactroutes = express.Router();
const {
    InsertContacts,
    UpdateContacts,
    DeleteContacts,
    GetAllContacts,
    GetSingleContacts,
    GetAllContactsByCategory,
    GetAllCategoryWithContact } = require('../controllar/contact');

contactroutes.post('/', InsertContacts);
contactroutes.patch('/:id', UpdateContacts);
contactroutes.delete('/:id', DeleteContacts);
contactroutes.get('/', GetAllContacts);
contactroutes.get('/:id', GetSingleContacts);
contactroutes.get('/contact/:id', GetAllContactsByCategory);
contactroutes.get('/category/contact', GetAllCategoryWithContact);

module.exports = contactroutes;