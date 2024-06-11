const Event = require("../models/event");
const ObjectId = require('mongoose').Types.ObjectId;

const InsertEvent = async (req, res) => {
    try {
        const data = req.body;
        // const file = req.file;
        // res.send({ data, file });

        if (!data.title || !data.date || !data.description || !data.specilization || !data.isactive) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Please Select Image"
            });
        }

        const imagename = req.file.filename;
        const obj = { ...data, image: imagename }
        const result = await Event.create(obj);
        res.status(201).json({ status: true, message: "Event Inserted", data: result });
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpadateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        // res.send(id);
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                status: false,
                message: "Event not found"
            });
        }

        if (!req.file) {
            const obj = req.body;
            const result = await Event.updateOne({ _id: id }, { $set: obj });
            return res.status(200).json({
                status: true,
                message: "Event upadated successfully",
                data: result
            })
        }

        const obj = { ...req.body, image: req.file.filename }
        const result = await Event.updateOne({ _id: id }, { $set: obj });
        res.status(200).json({
            status: true,
            message: "Event upadated successfully",
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

const GetAllEvent = async (req, res) => {
    try {
        var result = await Event.find({});
        var eventdata = [];
        for (var obj of result) {
            var obj = { ...obj.toObject(), "image": `http://localhost:5500/public/event/ ${obj.image}` };
            eventdata.push(obj);
        }
        res.status(200).json({
            status: true,
            data: eventdata
        });
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

const GetSingleEvent = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "ID is not valid"
            });
        }

        var event = await Event.findById(id);
        // res.json(event);
        if (!event) {
            return res.status(404).json({
                status: false,
                message: "Event not found"
            })
        }

        const result = await Event.findById(id);
        res.status(200).json({
            status: true,
            data: result
        });
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }

}

const DeleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                status: false,
                message: "Event not found"
            });
        }

        const result = await Event.deleteOne(event);
        res.status(200).json({
            status: true,
            message: "Event deleted successfully",
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

const ChangeEventStatus = async (req, res) => {
    try {
        const id = req.params.id;
        // res.send(id);
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({
                status: false,
                message: "Id is not valid"
            })
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                status: false,
                message: "Event not found"
            });
        }

        if (event.isactive == "yes") {
            const result = await Event.updateOne({ _id: id }, { $set: { isactive: "no" } });
            res.status(200).json({
                status: true,
                message: "Event upadated successfully",
                data: result
            })
        }
        else {
            const result = await Event.updateOne({ _id: id }, { $set: { isactive: "yes" } });
            res.status(200).json({
                status: true,
                message: "Event upadated successfully",
                data: result
            })
        }
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = {
    InsertEvent,
    UpadateEvent,
    GetAllEvent,
    GetSingleEvent,
    DeleteEvent,
    ChangeEventStatus
}
