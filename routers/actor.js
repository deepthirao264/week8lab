const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        }).populate('actors');

    },
        createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
        
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    removeMovie: function(req, res){
        let movieID = mongoose.Types.ObjectId(req.params.movieId);
        let actorID = mongoose.Types.ObjectId(req.params.actorId);

        Actor.findOne({_id: actorID }, function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            
            Movie.findOne({_id: movieID }, function(err, movie){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },
    deleteActorMovie : function(req, res){
        Actor.findById(req.params.id ,function (err, data){
            if (err) return res.status(400).json(err);
            Movie.deleteMany({_id: data.movies }, function (err){
                if (err) res.json(err)
                else
                Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json({"msg" : "Actor & Movies Deleted"})
                }); 
            })
        })
    }
};
