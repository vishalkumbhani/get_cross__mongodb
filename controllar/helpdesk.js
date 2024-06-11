const Helpdesk = require('../models/helpdesk');
const ObjectId = require('mongoose').Types.ObjectId;

const InsertCategory = async (req, res) => {
    try {
        const data = req.body;
        // res.send(data);
        if (!data.categoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            });
        }

        const obj = { ...data, categoryimage: req.file.filename }
        const result = await Helpdesk.create(obj);
        res.status(201).json({
            status: true,
            message: "Category inserted successfully",
            data: result
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

const UpadateCategory = async (req, res) => {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Helpdesk.findById(id);
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category is not found"
            })
        }

        const result = await Helpdesk.updateOne(
            { _id: id },
            {
                $set: { categoryimage: req.file.filename }
            })
        res.status(200).json({
            status: true,
            message: "Category Upadated Successfully",
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

const GetAllCategory = async (req, res) => {
    try {
        const result = await Helpdesk.find({});
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

const GetSingleCategory = async (req, res) => {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Helpdesk.findById(id);
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category is not found"
            })
        }

        res.status(200).json({
            status: true,
            data: category
        })
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}

const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const category = await Helpdesk.findById(id);
        if (!category) {
            return res.status(404).json({
                status: false,
                message: "Category is not found"
            })
        }

        const result = await Helpdesk.deleteOne(category);
        res.status(200).json({
            status: true,
            message: "Category deleted successfully",
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

module.exports = {
    InsertCategory,
    UpadateCategory,
    GetAllCategory,
    GetSingleCategory,
    DeleteCategory
}

