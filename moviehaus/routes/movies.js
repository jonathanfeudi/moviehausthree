'use strict'
const express     = require('express');
const movies      = express.Router();
const request     = require('request');
const db = require('../db/pg.js');

// const db = require('../db/pg')

// // /movies
movies.get('/', function(req, res) {
    let search = req.query.t;
    request(`http://www.omdbapi.com/?s=${search}`, function(err, response, body) {
        if(!err && response.statusCode == 200) {
            res.send(body);
        }
    });
})


movies.route('/api')
  .get(db.getMovies, function(req, res){
    res.send(res.data)
  })
  .post(db.addMovie, function(req, res){
    res.send(res.data)
  })

module.exports = movies;
