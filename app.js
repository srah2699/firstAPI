const joi = require("joi")
const express = require("express")
const app = express()

const mongoose = require("mongoose")
require('dotenv/config')
const genreRoute = require("./routes/genres")

app.use(express.json())

app.use('/api/genres', genreRoute)

mongoose.connect(process.env.DB_CONNECTION, () => console.log("db connected"))

const port = process.env.PORT || 3005
app.listen(3005, () => console.log("listening on" + port))