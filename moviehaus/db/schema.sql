DROP TABLE IF EXISTS movies cascade;
DROP TABLE IF EXISTS theatres cascade;

CREATE TABLE theatres (
  theatre_id SERIAL UNIQUE PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE movies (
       id SERIAL UNIQUE PRIMARY KEY,
       imdb VARCHAR(255),
       title VARCHAR(255) NOT NULL,
       year VARCHAR(255),
       poster TEXT,
       showtimes VARCHAR(255),
       theatre_id INTEGER REFERENCES theatres
);
