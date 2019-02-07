// const Card = require('../classes/Card');
// const date_compare = require('./react_function');
// new_card with 35% apr, 1000 limit, created on 9/17/18;
// test data
// I set this up using the Date() object. Didn't want to use an api.
let open_date = new Date("October 18, 2018 11:13:00");// 0 days
let second_transaction_date = new Date("November 2, 2018 15:13:20"); // 15 days
let third_transaction_date = new Date("November 12, 2018 15:13:20"); // 25 days
let check_balance_date = new Date("November 17,2018 15:13:20"); // 30 days
// const date_compare = (a, b) => {
//     if(a > b){
//         return true;
//     }
//     return false
// }
// Fist Test Scenario
// test('Test scenario 1', ()=> {
//     let test_one = new Card(.35, 1000, open_date);
//     test_one.card_transaction('charge', 500, open_date);

//     expect(test_one.get_balance_as_of_date(third_transaction_date)).toBe(500)
//     expect(test_one.get_balance_as_of_date(check_balance_date)).toBe(514.38);
// })
// //Second Test Scenario
// test('test scenario 2', ()=> {
//     let test_two = new Card(.35, 1000, open_date);

//     test_two.card_transaction('charge', 500,open_date);
//     expect(test_two.get_balance_as_of_date(second_transaction_date)).toBe(500);
    
//     test_two.card_transaction('payment', 200, second_transaction_date);
//     expect(test_two.get_balance_as_of_date(third_transaction_date)).toBe(300);

//     test_two.card_transaction('charge', 100, third_transaction_date);
//     expect(test_two.get_balance_as_of_date(check_balance_date)).toBe(411.99);
// })

test('data transaction validation', () => {
    expect(date_compare(check_balance_date, open_date)).toBe(false);
})

//Other tests   
// let saturday = new Date("November 17, 2018 20:00:01");
// let sunday = new Date("November 18, 2018 20:00:01");
// let after_hours = new Date("November 19, 2018 18:00:01");
// let friday_after_hours = new Date("November 16, 2018 18:00:01");
// let date_helper = require('./date_helper');

// test('30 + days balance', () => {
//     let test_three = new Card(.35, 1000, open_date);
//     test_three.card_swipe('charge', 800, open_date)
//     expect(test_three.get_balance_as_of_date(new Date("November 19, 2019 18:00:01"))).toBe(1000)
// })
// // interest tests;
// test('test calc_interest method', () => {
//     expect(new_card.calc_interest(500, 30)).toEqual(14.38);
//     expect(new_card.calc_interest(500, 15)).toEqual(7.19);
//     expect(new_card.calc_interest(300, 10)).toEqual(2.88);
//     expect(new_card.calc_interest(400, 5)).toBe(1.92)
// })
// // limit test 
// test('charges cannot be made that exceed credit limit', ()=> {
//     new_card.card_swipe('charge', 1300, new Date());
//     expect(new_card.get_balance_as_of_date()).toEqual(0)
//     expect(new_card.swipe_history[0].swipe_approved).toBe(false)
// })
// test('payments cannot exceed current balance', ()=> {
//     new_card
// })
// non business hour card_swipes
// test('Saturday card_swipe', ()=> {
//     expect(date_helper.check_transaction_post_date(saturday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
// });
// test('Sunday card_swipe', ()=> {
//     expect(date_helper.check_transaction_post_date(sunday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
// });
// test('bank after_hours card_swipe', ()=> {
//     expect(date_helper.check_transaction_post_date(new Date())).toEqual(new Date());    
// });
// test('during business hours card_swipe', () => {
//     expect(date_helper.check_transaction_post_date(new Date("November 20, 2018 08:00:01"))).toEqual(new Date("November 20, 2018 08:00:01"))
// })
// test('Friday after-hours card_swipe', ()=> {
//     expect(date_helper.check_transaction_post_date(friday_after_hours)).toEqual(new Date(friday_after_hours));
// })

// let day_35 = new Date("November 22,2018 15:13:20"); // 35 days
// let day_40 = new Date("December 2,2018 15:13:20"); //40 days
// let day_45 = new Date("December 7,2018 15:13:20"); //40 day
// let day_60 = new Date("December 22,2018 15:13:20"); //60 days
// let day_65 = new Date("December 27, 2018 15:13:20") //65 days

// test('see above', ()=> {
//     let test_two = new Card(.35, 1000, open_date);
//     test_two.card_transaction('charge', 500,open_date);
//     expect(test_two.get_balance_as_of_date(second_transaction_date)).toBe(500);
//     test_two.card_transaction('payment', 200, second_transaction_date);
//     expect(test_two.get_balance_as_of_date(third_transaction_date)).toBe(300);
//     test_two.card_transaction('charge', 100, third_transaction_date);
//     expect(test_two.get_balance_as_of_date(check_balance_date)).toBe(411.99);
//     expect(test_two.get_balance_as_of_date(day_35)).toBe(411.99);
//     test_two.card_transaction('charge', 300, day_40);
//     expect(test_two.get_balance_as_of_date(day_45)).toBe(411.99);
//     expect(test_two.get_balance_as_of_date(day_60)).toBe(711.99);
//     expect(test_two.get_balance_as_of_date(day_65)).toBe(7.8);
// })