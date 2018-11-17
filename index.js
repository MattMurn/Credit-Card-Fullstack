const Customer = require('./Customer');
const Card = require('./Card');
const moc_db = require('./moc_customer');
let inq = require('inquirer');

// console.log(moc_db);
let matt = new Customer('Matt Murnighan', 700);
mock_customers[matt.id] = matt;
// console.log(moc_db)
let x = new Card(.35, 1000);

x.card_transaction('charge', 100,'October 16, 2018 23:15:30');
console.log(x.balance);
// x.card_transaction('charge', 300, 'October 26, 2018 23:15:30');
// console.log(x.balance);
// x.card_transaction('payment', 200, 'October 29, 2018 23:15:30')
// console.log(x.balance);
// x.card_transaction('charge', 400, 'November 14, 2018 23:15:30');
console.log(x.balance);
console.log(x.get_trans());
// console.log(x.calc_interest(30));
// console.log(x.card_tranactions);
// x.card_transaction('payment', 300);
// console.log(x.calc_interest(30));
// console.log(x);


// console.log( x.start_date);

// inq.prompt([
//     {
//         type: 'input',
//         message: 'Please enter a customer id',
//         name: 'test'
//     }
// ]).then(answer => {
//     console.log(answer);
// })

