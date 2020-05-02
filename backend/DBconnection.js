const mongoose = require("mongoose");

function DBconnection() {
    mongoose.connect('mongodb://localhost:27017/insights')
}

module.exports = DBconnection