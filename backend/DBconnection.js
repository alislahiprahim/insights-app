const mongoose = require("mongoose");

function DBconnection() {
    mongoose.connect('mongodb+srv://admin:admin@cluster0-b18lf.mongodb.net/test?retryWrites=true&w=majority')
}

module.exports = DBconnection