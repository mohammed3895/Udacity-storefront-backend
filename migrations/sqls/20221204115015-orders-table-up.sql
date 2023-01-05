CREATE TABLE if not exists orders (
    id SERIAL PRIMARY KEY NOT NULL,
    status VARCHAR(70) NOT NULL,
    user_id integer NOT NULL
        REFERENCES users(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);