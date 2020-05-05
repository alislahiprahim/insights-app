const mongoose = require("mongoose"),
    express = require("express"),
    lodash = require('lodash'),
    router = express.Router(),
    userModel = require('../models/users'),
    jwt = require('jsonwebtoken')



function verifyToken(req, resp, next) {
    if (!req.headers.authorization) {
        resp.status(401).send('unauthorized request')
    }
    var token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {

        resp.status(401).send('unauthorized request')

    }
    var payload = jwt.verify(token, 'secretKey')

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


router.post("/uploadImage", verifyToken, async (req, resp) => {

    const { Url } = req.body
    const { userId } = req
    debugger
    let userData = await userModel.findOne({ _id: userId })
    userData.image.push({ url: Url, date: Date.now() })
    const user = await userData.save()
    resp.json({ result: user })

});

router.get('/getImages', verifyToken, (req, resp) => {

    userModel.find({}).exec((err, data) => {
        err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
    })


})

router.post('/getUserImages', verifyToken, (req, resp) => {

    const { id } = req.body

    userModel.findOne({ _id: id }).exec((err, data) => {
        err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', images: data.image })
    })

})

module.exports = router 