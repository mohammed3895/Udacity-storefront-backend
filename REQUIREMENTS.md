### Database tables

## users

-   user_name VARCHAR
-   email VARCHAR
-   password VARCHAR

## products

-   name VARCHAR
-   description TEXT
-   price INTEGER

## orders

-   id INTEGER
-   status VARCHAR
-   quantity INTEGER
-   user_id referenes users (id) INTEGER

## order products

-   id INTEGER
-   order_id references order (id) INTEGER
-   product_id references products (id) INTEGER
