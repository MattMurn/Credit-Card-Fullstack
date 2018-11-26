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

// db.customers.findAll({}).then(data => {
//   console.log(data.dataValues);
//   data.map((customer, i)=> {
//     console.log(customer.dataValues)
//   })
// })
get_by_id = num => {
  db.customers.findAll({
    where: {
      id: num
    }
  }).then( data => {
    console.log(data[0].dataValues)
    return data;
  })
}
let first_card = new Card(.35, 1000, new Date(), 3);
create_new_card = instance => {
  db.cards.create({
    customer_id: first_card.customer_id,
    apr: first_card.apr,
    credit_limit: first_card.credit_limit,
    current_balance: first_card.balance,
    interest_accrued: 0,
    createdAt: first_card.open_date
  })
}

console.log(get_by_id('3'));
db.sequelize.sync({force:false})
.then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
}) 