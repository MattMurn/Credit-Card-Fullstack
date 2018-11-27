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

let open_date = new Date("October 18, 2018 11:13:00");// 0 days
let second_transaction_date = new Date("November 2, 2018 15:13:20"); // 15 days
let third_transaction_date = new Date("November 12, 2018 15:13:20"); // 25 days
let check_balance_date = new Date("November 17,2018 15:13:20"); // 30 days


let first_card = new Card(.35, 1000, new Date(), 3);
first_card.card_transaction('charge', 500, open_date);
first_card.get_balance_as_of_date(check_balance_date);

console.log(first_card.card_id);
create_new_card = instance => {

  db.cards.create({
    customer_id: instance.customer_id,
    card_id: instance.card_id,
    apr: instance.apr,
    credit_limit: instance.credit_limit,
    current_balance: instance.balance,
    interest_accrued: 0,
    createdAt: instance.open_date
  })
}
create_new_card(first_card);
send_transaction_history = array => {

  array.map((element, i)=> {
    -
    db.transactions.create({
      transaction_id: element.transaction_id,
      card_id: element.customer_id,
      transaction_type: element.transaction_type,
      transaction_timestamp: element.transaction_timestamp.toString(),// from Date obj
      post_date: element.post_date.toString(),// from Date obj
      transaction_amount: element.transaction_amount,
      current_balance: element.current_balance,
      interest_accrued: element.interest_accrued,
      transaction_approved: element.transaction_approved
    })
  })
}

send_transaction_history(first_card.transaction_history);
// console.log(get_by_id('3'));
db.sequelize.sync({force:false})
.then(() => {
  app.listen(PORT, () =>{
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
}) 