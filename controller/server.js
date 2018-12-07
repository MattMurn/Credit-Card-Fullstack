const Customer = require('./classes/Customer');
const Card = require('./classes/Card');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const db = require('../model/sequelize/models');
const PORT = 3001;
const query_functions = require('./query_functions');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

let open_date = new Date("October 18, 2018 11:13:00");// 0 days
let second_transaction_date = new Date("November 2, 2018 15:13:20"); // 15 days
let third_transaction_date = new Date("November 12, 2018 15:13:20"); // 25 days
let check_balance_date = new Date("November 17,2018 15:13:20"); // 30 days
 
let first_card = new Card(.35, 1000, new Date(), 2);
query_functions.create_new_card(first_card);
first_card.card_transaction('charge', 500, open_date);
first_card.card_transaction('payment', 300, second_transaction_date);
query_functions.send_transaction_history(first_card.transaction_history);
first_card.get_balance_as_of_date(check_balance_date);

// query_functions.get_customer_info('Abby', 'Rose')
// need to pass a string.
// query_functions.get_transactions(toString(3));
require('./routing/db_routes')(app);
db.sequelize.sync({force:false})
.then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
}) 


// for(let i = 10; i > 0; i--){
//   console.log(i);
// }

// function recursive(num){
//   (num === 0) ? 0 : recursive(num -1);
// }

// console.log(recursive(10));