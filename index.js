const Customer = require('./Customer');
const Card = require('./Card');
const moc_db = require('./moc_customer');
let inq = require('inquirer');

// console.log(moc_db);
let matt = new Customer('Matt Murnighan', 700);
mock_customers[matt.id] = matt;
// console.log(moc_db)
let x = new Card(.35, 1000);

// x.card_transaction('charge', 100,'October 16, 2018 23:15:30');
// console.log(x.balance);
// x.card_transaction('charge', 300, 'October 26, 2018 23:15:30');
// console.log(x.balance);
// x.card_transaction('payment', 200, 'October 29, 2018 23:15:30')
// console.log(x.balance);
// x.card_transaction('charge', 400, 'November 14, 2018 23:15:30');
// x.card_transaction('charge', 600, 'November 14, 2018 23:15:30');
// console.log(x.balance);
// console.log(x.get_trans());
let tester_trans = {
    trans_id: Math.random(),
    trans_type: 'charge',
    trans_time: 'October 16, 2018 23:15:30',
    trans_amount: 400,
    interest_adjusted: null
}

/* 
Saturday tasks...
sucessfully calculate interest from card object instance
pass test using dummy data.
implement cli for user interaction.
create table(s) to hold transactions / persistance.
*/


 let name = (function(y) {
    

    if( y % 30 === 0){
        console.log(`${y} is divisible by 30`)
    }
})(6)

name;