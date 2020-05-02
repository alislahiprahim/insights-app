const mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router(),
    userModel = require('../models/users'),
    imageModel = require('../models/images'),
    jwt = require('jsonwebtoken')



function verifyToken(req, resp, next) {
    
    if (!req.headers.authorization) {
        resp.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {

        resp.status(401).send('unauthorized request')

    }
    let payload = jwt.verify(token, 'secretKey')

    if (!payload) {
        return resp.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}


router.post('/register', (req, resp) => {

    const { username, email, password } = req.body
    const user = new userModel({
        _id: mongoose.Types.ObjectId(),
        username,
        email,
        password
    })

    user.save((err, data) => {
        const payload = { subject: data._id }
        const token = jwt.sign(payload, 'secretKey')
        err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', token })
    })

})


router.post('/login', (req, resp) => {
    const { email, password } = req.body
    userModel.findOne({ email: email }).exec((err, userData) => {
        if (err) {
            resp.json(err)
        } else {
            if (!userData) {
                resp.json({ message: 'invalid email' })
            } else {
                if (userData.password === password) {
                    const payload = { subject: userData._id }
                    const token = jwt.sign(payload, 'secretKey')
                    err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', token })
                } else {
                    resp.json({ message: 'invalid password' })
                }
            }
        }
    })
})


router.post("/uploadImage", (req, resp) => {

    const { imageURL } = req.body

    const image = new imageModel({

        _id: mongoose.Types.ObjectId(),
        Url: imageURL,

    })
    image.save((err, data) => {

        err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

    })

});

router.get('/getImages', verifyToken,(req, resp) => {

    imageModel.find({}).exec((err, data) => {

        err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

    })

})

module.exports = router 