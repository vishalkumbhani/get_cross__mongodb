const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
    {
        category_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Contacts = mongoose.model("contacts", ContactSchema);

module.exports = Contacts;