const Customer = require('./Customer');
const Card = require('./Card');
const moc_db = require('./moc_customer');
const moment = require('moment');
let inq = require('inquirer');

let now = moment();
console.log(now.format())
let open_date = new Date("October 18, 2018 11:13:00");
let first_transaction_date = new Date("October 18, 2018 11:13:00");
let second_transaction_date = new Date("November 2, 2018 15:13:20");
let third_transaction_date = new Date("November 12, 2018 15:13:20");
let check_balance_date = new Date("November 17,2018 15:13:20");

let test_two = new Card(.35, 1000, open_date);
test_two.card_swipe('charge', 500,first_transaction_date);
test_two.card_swipe('payment', 200, second_transaction_date);
test_two.card_swipe('charge', 100, third_transaction_date);

console.log(test_two.get_balance_as_of_date(check_balance_date));