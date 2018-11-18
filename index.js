const Customer = require('./Customer');
const Card = require('./Card');
const mock_db = require('./mock_db');
let first_transaction_date = new Date("October 18, 2018 11:13:00");
let second_transaction_date = new Date("November 2, 2018 15:13:20");
let third_transaction_date = new Date("December 12, 2018 15:13:20");
let check_balance_date = new Date("January 14,2019 15:13:20");
// started mock associations and want to build an express server / mysql backend to make it more robust.
let Matt = new Customer('Matt Murnighan', 700);
let first_card = new Card(.35, 1000, open_date, Matt.id);
let second_card = new Card(.34, 1000, first_transaction_date, Matt.id);
first_card.card_swipe('charge', 150, second_transaction_date);
first_card.get_balance_as_of_date(third_transaction_date);
first_card.get_balance_as_of_date(check_balance_date);

let test_two = new Card(.35, 1000, open_date);
test_two.card_swipe('charge', 500,check_balance_date);





