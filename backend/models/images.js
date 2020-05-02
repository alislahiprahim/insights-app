const mongoose = require("mongoose");

imagemodel = mongoose.model('Images', {

    _id: mongoose.Schema.Types.ObjectId,
    Url: String,
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }

})

module.exports = imagemodel