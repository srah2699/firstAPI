const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    year: {
        type: Number,
        min: 1800,
        max: 3000,
        required: true,
      },
    directors: [
        {
          type: String,
        },
    ],
    writers: [
        {
          type: String,
        },
    ],
    cast: [
        {
          type: String,
        },
    ],
})


module.exports = mongoose.model('Genres',genreSchema)