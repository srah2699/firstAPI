const express = require('express')
const joi = require("joi")
const router = express.Router()
const Genre = require('../models/genre')


router.post('/', async(req, res) => {
    const {error} = validateMovie(req.body.genreName)
    if(error) res.status(404).send(error.details[0].message)

    const movie = new Genre(req.body)
    try{
        const createdGenre = await movie.save()
        res.json(createdGenre)
    }catch(err){
        res.status(404).json({message : err})
    }
})

router.get('/', async(req, res) => {
    try{
        const genres = await Genre.find()
        res.json(genres)
    }catch(err){
        res.json({message : err})
    }
})

router.get('/:id', async(req, res) => {
    try{
        const genre = await Genre.findById(req.params.id);
        res.json(genre)
    }catch(err){
        res.json({message : err})
    }
})

router.put('/:id', async(req, res) => {
    const {error} = validateMovie(req.body.genre)
    if(error) res.status(404).send(error.details[0].message)

    try{
        const genre = await Genre.updateOne({_id : req.params.id},{
            name : req.body.name,
            genre : req.body.genre
        })
        res.json(genre)
    }catch(err){
        res.json({message : err})
    }

})

router.delete('/:id', async(req, res) => {
    try{
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id)
        res.json(deletedGenre)
    }catch(err){
        res.json({message : err})
    }
    
})

function validateMovie(genre){
    const schema = {
        genre : joi.string().min(3).required()
    }
    return joi.validate(genre, schema )
}

module.exports = router

