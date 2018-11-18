const Customer = require('./Customer');
const Card = require('./Card');
const moc_db = require('./moc_customer');
const moment = require('moment');
let inq = require('inquirer');

let now = moment();
console.log(now.format())

// console.log(moc_db);
// let matt = new Customer('Matt Murnighan', 700);
// mock_customers[matt.id] = matt;
// console.log(moc_db)
// let x = new Card(.35, 1000);

// let tester_trans = {
//     trans_id: Math.random(),
//     trans_type: 'charge',
//     trans_time: 'October 16, 2018 23:15:30',
//     trans_amount: 400,
//     interest_adjusted: null
// }

