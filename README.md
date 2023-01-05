# STROE_FRONT_BACKEND
<!--  -->
a backend server for ecommerce website that have database and restful routes
to get start with it, read informaitions below.
<!--  -->
## NOTE
<!--  -->
when sign in you will get { token } as response , copy it and
use the token in request headers of creating new product .
<!--  -->
- ### Example:

    -   create new product

        -   "name"
        -   "description"
        -   "price"

    -   create user

        -   "user_name"
        -   "email"
        -   "password"

    -   create order
        -   "status" : string
        -   "user_id" : number
        -

### SETUP FILES

## .env

    -  POSTGRES_HOST=localhost
    -  POSTGRES_USER=full_stack_user
    -  POSTGRES_DB=storefront_db
    -  POSTGRES_TEST_DB=storefront_test_db
    -  POSTGRES_PASSWORD='DB Password'
    -  ENV=dev
    -  BCRYPT_PASSWORD='Add Your Pepper'
    -  SALT_ROUNDS=10
    -  TOKEN_SECRET='Add Your Secret'

### SCRIPTS

-   'npm install' to install projects dependencies
-   'npm run dev' to start app at 'http://localhost:3000'
-   'npm run test' to run test

# DATABASE

-   run db-migrate up to create database and start with it

### ENDPOINTS

## Products

-   app.get ('/products') to show all listed products
-   app.get ('/products/id') to show specific product by adding id as parameter
-   app.post ('/products') to add new product
-   app.put ('/products/id') to update single product with id as parameter
-   app.delete ('/products/id') to delete the product

## Orders

-   app.get ('/orders') to show all listed orders
-   app.get ('/orders/id') to show specific order by adding id as parameter
-   app.post ('/orders') to add new order
-   app.put ('/orders/id') to update single order with id as parameter
-   app.delete ('/orders/id') to delete the order

## Users

-   app.get ('/users') to show all listed users
-   app.get ('/users/id') to show specific user by adding id as parameter
-   app.post ('/users') to add new user
-   app.put ('/users/id') to update single user with id as parameter
-   app.delete ('/users/id') to delete the user

## Cart

-   app.post ('/orders/id/products') to add new product to order list
-   app.get ('/orders/id/products') to show order list
