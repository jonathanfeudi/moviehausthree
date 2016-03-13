DROP TABLE IF EXISTS movies cascade;

CREATE TABLE movies (
       id SERIAL UNIQUE PRIMARY KEY,
       imdb VARCHAR(255),
       title VARCHAR(255) NOT NULL,
       year VARCHAR(255),
       poster TEXT,
       showtimes VARCHAR(255)
);
