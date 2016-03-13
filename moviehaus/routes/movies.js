'use strict'
const express     = require('express');
const movies      = express.Router();
const request     = require('request')

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



  // .post( db.addTask, (req,res)=>res.json(res.rows))


module.exports = movies;
