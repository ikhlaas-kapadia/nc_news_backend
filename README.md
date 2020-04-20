# NC News API

This back-end API is built using node.js, postgres and Knex. The API serves articles of various users on different topics and allows users to post/delete comments and upvote/downvote articles. The API stores data on a relational database (postgres) which is hosted using HEROKU.

Technologies used to create API:

- Express.js - Back-End framework
- Knex.js - Query Builder for SQL databases
- Postgres - Object-relational database.

The API was tested using **insomnia, mocha, chai and supertest**. You may install these if you want to test the API endpoints.

# Pre-Requisites

PLEASE DOWNLOAD AND INSTALL THE FOLLOWING SOFTWARE BEFORE RUNNING THE PROJECT:

`NODE.JS`

`POSTGRES`

# Getting Started For Local Installation On Your Computer

1. Fork the repository on to your local machine.

2. cd in to the main directory of the where you want to store the project

3. Open commandline/terminal from the relevant root directory and clone the repository E.g -  **`git clone https://github.com/ikhlaas-kapadia/nc_news_backend`**

4) Navigate to the project root directory of the cloned project **`cd nc_news_backend`**  and install the below dependencies:

- Node.js v12.13.0 - `npm i node.js@v12.13.0`
- Postgres v12.2 - `npm i pg@12.2`
- Knex - `npm i knex`
- API testing tools:
  - Insomnia - `npm i insomnia`
  - Mocha, Chai, Supertest (optional) - `npm i mocha chai supertest -D`

  NOTE: You can also use **`npm i`** to install all the dependencies except for the testing tools which need to be installed using the above commands

5. Run the command **`npm run setup:dbs`** to setup the database

6. Run the command **`npm run seed`** to seed the database

7. Run the command **`npm start`**to start running the server. Once the server is up and running, you will have access to the endpoints highlighted in file `endpoints.json`. To stop the server press `ctrl + c`

## TESTING

You can test the endpoints by running the test script `npm test` in your terminal.
