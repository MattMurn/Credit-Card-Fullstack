const Customer = require('./classes/Customer');
const Card = require('./classes/Card');
// const mock_db = require('./mock_db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./sequelize/models');
const PORT = 3000;
const query_functions = require('./query_functions');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let open_date = new Date("October 18, 2018 11:13:00");// 0 days
let second_transaction_date = new Date("November 2, 2018 15:13:20"); // 15 days
let third_transaction_date = new Date("November 12, 2018 15:13:20"); // 25 days
let check_balance_date = new Date("November 17,2018 15:13:20"); // 30 days

let first_card = new Card(.35, 1000, new Date(), 3);
query_functions.create_new_card(first_card);
first_card.card_transaction('charge', 500, open_date);
first_card.card_transaction('payment', 300, second_transaction_date);
query_functions.send_transaction_history(first_card.transaction_history);
first_card.get_balance_as_of_date(check_balance_date);
// console.log(query_functions.get_customer_info("Michael", "Conners"));
// query_functions.get_card_info(user_id);
let user_id;
get_customer_info = (first, last) => {
  db.customers.findAll({
  where: {
    first_name: first,
    last_name: last
  }
})  
.then(function(data){
  //   console.log(data[0].dataValues.id); 
  // let test = data[0].dataValues.id;
    
    user_id = data[0]
    console.log(user_id);
    return user_id;
  })
}
console.log(get_customer_info('Michael', 'Conenrs'))

db.sequelize.sync({force:false})
.then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
}) 
