const Customer = require('./classes/Customer');
const Card = require('./classes/Card');
// const mock_db = require('./mock_db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./sequelize/models');
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());





db.sequelize.sync()
.then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
}) 