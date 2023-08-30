const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express();
const port = process.env.APP_PORT;

const dbURI = process.env.MONGODB_URI

app.use(cors())

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

app.use("/", async (req, res) => {
    res.json({
        name: process.env.APP_NAME,
        version: process.env.APP_VERSION
    })
})

mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true })
    .then((res) => {
        // only listen for requests once database data has loaded
        app.listen(port, () => console.log("Server is up on port " + port))
    })
    .catch(err => console.log(err))
