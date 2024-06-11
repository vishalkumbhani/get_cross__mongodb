const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () => {
    const connection = await mongoose.connect(process.env.CONNECTION_URL);
    return connection;
}

module.exports = connection;