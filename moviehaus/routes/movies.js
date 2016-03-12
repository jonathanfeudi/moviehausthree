const express     = require('express');
const movies       = express.Router();

// const db = require('../db/pg')

// // /tasks
// movies.route('/')
//   .get( db.getTasks, (req,res)=>res.json(res.rows))
//   .post( db.addTask, (req,res)=>res.json(res.rows))


module.exports = movies;
