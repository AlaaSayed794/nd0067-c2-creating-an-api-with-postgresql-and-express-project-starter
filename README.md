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

- you have to create two databases with the value you set in POSTGRES_DB, POSTGRES_TEST_DB


## Instructions


### 1.  DB Creation and Migrations

- to start dev environment run `npm run dev-startdb`, to reset it run `npm run dev-resetdb`
- to create a user to start with run  `node creaeUser.mjs`, your db has to be started before using this command

### 2. API endpoints
- check REQUIREMENTS.md

### 3. Authentication
- on user creation or successful authentication, user is provided a token, make sure to add this as a bearer token in authorization for routes that require authentication to work correctly

### 3. QA and `README.md`

- to run tests for database run `npm run test-db`
- to run tests for routes run `npm run test-routes`
