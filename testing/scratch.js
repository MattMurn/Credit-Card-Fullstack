const Customer = require('../classes/Customer');
const Card = require('../classes/Card');
const mock_db = require('../mock_db');
let open_date = new Date("October 18, 2018 11:13:00");
let second_transaction_date = new Date("November 2, 2018 15:13:20");
let third_transaction_date = new Date("November 12, 2018 15:13:20");
let check_balance_date = new Date("November 17,2018 15:13:20");
// started mock associations and want to build an express server / mysql backend to make it more robust.
let Matt = new Customer('Matt Murnighan', 700);
// let first_card = new Card(.35, 1000, open_date, Matt.id);
// let second_card = new Card(.34, 1000, first_transaction_date, Matt.id);
// first_card.card_swipe('charge', 150, second_transaction_date);
// first_card.get_balance_as_of_date(third_transaction_date);
// first_card.get_balance_as_of_date(check_balance_date);

let test_two = new Card(.35, 1000, open_date);
// test_two.card_swipe('charge', 500,check_balance_date);





let day_35 = new Date("November 22,2018 15:13:20"); // 35 days
let day_40 = new Date("December 2,2018 15:13:20"); //40 days
let day_45 = new Date("December 7,2018 15:13:20"); //40 day
let day_60 = new Date("December 21,2018 15:13:20"); //60 days
let day_65 = new Date("December 26,2018 15:13:20") //65 days


    let test_plus = new Card(.35, 1000, open_date);
    test_plus.card_transaction('charge', 500,open_date);
    test_plus.get_balance_as_of_date(second_transaction_date);//500
    test_plus.card_transaction('payment', 200, second_transaction_date);
    test_plus.get_balance_as_of_date(third_transaction_date)//300
    test_plus.card_transaction('charge', 100, third_transaction_date);
    console.log(test_plus.transaction_history)
    test_plus.get_balance_as_of_date(check_balance_date)//411.99
    test_plus.get_balance_as_of_date(day_35)
    console.log(test_plus.transaction_history)
    test_plus.card_transaction('charge', 300, day_40);
    test_plus.get_balance_as_of_date(day_45)//411.99
    console.log(test_plus.transaction_history)
    test_plus.get_balance_as_of_date(day_60)// calc interest

    console.log(test_plus.calc_interest(711.99, 20));
    console.log(test_plus.calc_interest(411.99, 10))

    // console.log(9 % 30 > 0);
    checkDay = (x)=>{   
        return ((x > 30) || (x % 30 === 0));
    }

    // console.log(checkDay(65), checkDay(60));
    // console.log(test_plus.transaction_history)
    test_plus.get_balance_as_of_date(day_65) // calc interest

    console.log(mock_db.mock_cards);