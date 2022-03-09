require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Pokemon = require('./models/pokemon')
const PORT = process.env.PORT
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/pokemon/seed', (req, res) => {
    Pokemon.create([
        {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
        {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
        {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
        {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
        {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
        {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
        {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"}
    ], (err, data) =>{
        res.redirect('/pokemon')
    })
})

app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})
// index route
app.get('/pokemon', (req, res) => {
    Pokemon.find({}, (error, allPokemon) => {
        res.render('Index', {pokemon: allPokemon})
    })
})

app.get('/pokemon/new', (req, res) => {
    res.render('New')
})
// create pokemon route
app.post('/pokemon', (req, res) => {
    Pokemon.create(req.body, (error, createdPokemon) => {
        res.redirect('/pokemon')
    })
})
// show route
app.get('/pokemon/:id', (req, res) => {
    Pokemon.findById(req.params.id, (error, foundPokemon) => {
        res.render('Show', {pokemon: foundPokemon})
    })
})
// delete route
app.delete('/pokemon/:id', (req, res) =>{
    Pokemon.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/pokemon')
    })
})
// edit route
app.get('/pokemon/:id/edit', (req, res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) =>{
        if(!err) {
            res.render('Edit', { pokemon: foundPokemon })
        }
        else {
            res.send({ msg: err.message })
        }
    })
})
// second portion of edit route
app.put('/pokemon/:id', (req, res) =>{
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundPokemon) =>{
        res.redirect('/pokemon')
    })
})


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
})
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))