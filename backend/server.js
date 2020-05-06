var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    api = require('./routes/apis'),
    DBconnection = require('./DBconnection'),
    app = express()

DBconnection()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', api)




const port = process.env.PORT || 8080
app.listen(8080)