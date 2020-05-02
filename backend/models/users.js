const mongoose = require("mongoose");

usermodel = mongoose.model('Users', {

    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images' }]

})

module.exports = usermodel