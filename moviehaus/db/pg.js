var pgp = require('pg-promise')({});
var dotenv = require('dotenv');
dotenv.load();

var cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn)

function addMovie(req, res, next){
  db.any("INSERT INTO movies(imdb, title, year, poster, showtimes) VALUES($1, $2, $3, $4, $5) ", [req.body.imdb, req.body.title, req.body.year, req.body.poster, req.body.showtimes])
    .then(function(data){
      console.log(data);
      next()
    })
    .catch(function(error){
        console.erorr(error);
    })
};

function getMovies(req, res, next){
  console.log(cn);
  db.any("SELECT * FROM movies;")
    .then(function(data){
      res.data = data;
      next()
    })
    .catch(function(error){
      console.error(error);
    })
};

function getOneMovie(req, res, next){
  db.any("SELECT * FROM movies WHERE name = ($1);", [req.params.imdb])
    .then(function(data){
      res.data = data;
      next();
    })
    .catch(function(error){
      console.error(error);
    })
};

module.exports.getOneMovie = getOneMovie;
module.exports.getMovies = getMovies;
module.exports.addMovie = addMovie;
