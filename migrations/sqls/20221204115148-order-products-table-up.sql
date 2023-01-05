CREATE TABLE if not exists order_products (
    id SERIAL PRIMARY KEY NOT NULL,
    quantity INTEGER NOT NULL,
    product_id INTEGER NOT NULL 
        REFERENCES orders(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    order_id INTEGER NOT NULL 
        REFERENCES products(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);