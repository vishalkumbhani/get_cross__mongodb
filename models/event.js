const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        specilization: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        isactive: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
const Event = mongoose.model("events", EventSchema);

module.exports = Event;