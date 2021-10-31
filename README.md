# Storefront Backend Project

## Getting Started

- To get started, clone this repo and run `yarn or npm i` in your terminal at the project root.

- you have to have a .env file in the repo, it has to contain the following variables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
NODE_ENV=dev
BCRYPT_PASSWORD=your hash password
SALT_ROUNDS=number of rounds
TOKEN_SECRET=yourSecret

- you have to create two databases with the value you set in POSTGRES_DB, POSTGRES_TEST_DB, this is an example for the SQL needed when connected to psql
`
CREATE USER shopping_user WITH PASSWORD 'password123';    
CREATE DATABASE shopping;  
\c shopping
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
CREATE DATABASE shopping_test;
\c shopping_test
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
`

## Overview


### 1.  DB Creation and Migrations

- to run migrations up on dev environment run `npm run dev-startdb`, to run migrations down it run `npm run dev-resetdb`
- to create a user to start with run  `node creaeUser.mjs`, your db has to be started before using this command, 
setting NODE_END variable to test or dev will create the user on the specified database.
- no migrations is needed to run the tests as the test script will do the up and down migrations,but if needed , 
to run migrations up on test use `npm run test-up`, to run migrations down , use `npm run test-teardown`

### 2. API endpoints
- check REQUIREMENTS.md

### 3. Authentication
- on user creation or successful authentication, user is provided a token, make sure to add this as a bearer token in authorization for routes that require authentication to work correctly

### 4. QA and `README.md`

- to run tests for database run `npm run test-db`
- to run tests for routes run `npm run test-routes`

### 5. Local host ports
-for the database, port is not specified so it will run on the selected port for postgres installation (default is 5432)
-server is running on port 3000