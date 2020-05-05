const mongoose = require("mongoose");

usermodel = mongoose.model('Users', {

    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: [{

        url: String,
        date: { type: Date, default: Date.now },
        rating: Number

    }]

})

module.exports = usermodel