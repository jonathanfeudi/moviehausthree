DROP TABLE IF EXISTS movies cascade;

CREATE TABLE movies (
    id SERIAL UNIQUE PRIMARY KEY,
    title TEXT,
    year int,
    poster varchar (255)
)
