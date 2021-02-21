
CREATE DATABASE tinderreactdb;


CREATE TABLE member(
    ID SERIAL,
    username VARCHAR(255),
    password VARCHAR(255),
    age SMALLINT,
    email VARCHAR(255),
    gender VARCHAR(255),
    interestedIn VARCHAR(255),
    likes SMALLINT DEFAULT(10),
    messages SMALLINT DEFAULT(4)
);


CREATE TABLE match(
    ID SERIAL,
    name VARCHAR(255),
    age SMALLINT,
    email VARCHAR(255),
    gender VARCHAR(255)
);