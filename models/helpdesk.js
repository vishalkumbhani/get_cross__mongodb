const mongoose = require('mongoose');

const HelpdeskSchema = mongoose.Schema(
    {
        categoryname: {
            type: String,
            required: true
        },
        categoryimage: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)
const Helpdesk = mongoose.model("helpdesks", HelpdeskSchema);

module.exports = Helpdesk;