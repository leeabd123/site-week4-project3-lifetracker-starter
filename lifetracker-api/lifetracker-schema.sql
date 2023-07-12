CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    date        TIMESTAMP NOT NULL DEFAULT NOW()         
);

CREATE TABLE Excercise (
    id          SERIAL PRIMARY KEY,
    user_email  TEXT NOT NULL,
    title       TEXT NOT NULL,
    duration    TEXT NOT NULL,
    intensity   TEXT NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT NOW()         
);


CREATE TABLE Nutrition (
    id          SERIAL PRIMARY KEY,
    user_email  TEXT NOT NULL,
    category    TEXT NOT NULL,
    calories    TEXT NOT NULL,
    nutrients   TEXT NOT NULL,
    img         TEXT NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT NOW()         
);


CREATE TABLE Sleep (
    id          SERIAL PRIMARY KEY,
    user_email  TEXT NOT NULL,
    category    TEXT NOT NULL,
    start_time  TEXT NOT NULL,
    end_time    TEXT NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT NOW()         
);