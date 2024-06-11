const Contacts = require('../models/contact');
const Helpdesk = require('../models/helpdesk');
const ObjectId = require('mongoose').Types.ObjectId

const InsertContacts = async (req, res) => {
    try {
        const data = req.body;
        if (!data.category_id || !data.name || !data.contact) {
            return res.status(400).json({
                status: false,
                message: "Pllease add all data"
            })
        }

        const result = await Contacts.create(data);
        res.status(200).json({
            status: true,
            message: "Contact insert successfully",
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

const UpdateContacts = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const contact = await Contacts.findById(id);
        if (!contact) {
            return res.status(404).json({
                status: false,
                message: "Contact not found"
            })
        }

        const obj = { ...req.body, category_id: contact.category_id }
        const result = await Contacts.updateOne(
            { _id: id },
            { $set: obj })
        res.status(200).json({
            status: true,
            message: "Contact updated successfully",
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

const DeleteContacts = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const contact = await Contacts.findById(id);
        if (!contact) {
            return res.status(404).json({
                status: false,
                message: "Contact not found"
            })
        }

        const result = await Contacts.deleteOne(contact)
        res.status(200).json({
            status: true,
            message: "Contact deleted successfully",
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

const GetAllContacts = async (req, res) => {
    try {
        const result = await Contacts.find({});
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

const GetSingleContacts = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const contact = await Contacts.findById(id);
        if (!contact) {
            return res.status(404).json({
                status: false,
                message: "Contact not found"
            })
        }

        res.status(200).json({
            status: true,
            data: contact
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllContactsByCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contacts.find({ category_id: id });

        if (!contact || contact.length <= 0) {
            return res.status(404).json({
                status: false,
                message: "Contact not Found"
            })
        }
        res.status(200).json({
            status: true,
            data: contact
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetAllCategoryWithContact = async (req, res) => {
    try {
        const categorydata = await Helpdesk.find({});
        const categorywisecontact = [];

        for (const category of categorydata) {

            const contact = await Contacts.find({ category_id: category._id });
            const categorywithcontacts = { ...category.toObject(), contact: contact };
            categorywisecontact.push(categorywithcontacts);
        }
        res.status(200).json({
            status: true,
            message: "All data found",
            data: categorywisecontact
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
    InsertContacts,
    UpdateContacts,
    DeleteContacts,
    GetAllContacts,
    GetSingleContacts,
    GetAllContactsByCategory,
    GetAllCategoryWithContact
}

