//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.post('/actors/:id/movies', actors.addMovie);
//W8 Lab
//2
app.delete('/actors/:id/movies', actors.deleteActorMovie)
//3
app.delete('/actors/:actorId/:movieId', actors.removeMovie);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//W8 Lab
//1
app.delete('/movies/:id', movies.deleteOne);
//4
app.delete('/movies/:movieId/:actorId', movies.removeActor);
//5
app.post('/movies/:id/actors', movies.addActor);
//6
app.get('/movies/:year1/:year2', movies.findMoviesByYear);
//extra task 
app.put('/movies', movies.incrementYear);