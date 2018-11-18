const Card = require('./Card');
// new_card with 35% apr, 1000 limit, created on 9/17/18;
const moment = require('moment');
let new_card = new Card(.35, 1000, new Date());
let open_date = new Date("October 18, 2018 11:13:00");
let first_transaction_date = new Date("October 18, 2018 11:13:00");
let second_transaction_date = new Date("November 2, 2018 15:13:20");
let third_transaction_date = new Date("November 12, 2018 15:13:20");
let check_balance_date = new Date("November 17,2018 15:13:20");
let saturday = new Date("November 17, 2018 20:00:01");
let sunday = new Date("November 18, 2018 20:00:01");
let after_hours = new Date("November 19, 2018 18:00:01");
let friday_after_hours = new Date("November 16, 2018 18:00:01");
let date_helper = require('./date_helper');
// let moment_test = moment();
// Fist Test Scenario
test('Test scenario 1', ()=> {
    let test_one = new Card(.35, 1000, open_date);
    test_one.card_swipe('charge', 500, first_transaction_date);

    expect(test_one.get_balance_as_of_date(check_balance_date)).toBe(514.38);
})
test(`test scenario 2`, ()=> {
    let test_two = new Card(.35, 1000, open_date);
    test_two.card_swipe('charge', 500,first_transaction_date);
    test_two.card_swipe('payment', 200, second_transaction_date);
    test_two.card_swipe('charge', 100, third_transaction_date);

    expect(test_two.get_balance_as_of_date(check_balance_date)).toBe(411.99);
})
// interest tests;
test('test calc_interest method', () => {
    expect(new_card.calc_interest(500, 30)).toEqual(14.38);
    expect(new_card.calc_interest(500, 15)).toEqual(7.19);
    expect(new_card.calc_interest(300, 10)).toEqual(2.88);
    expect(new_card.calc_interest(400, 5)).toBe(1.92)
})
// limit test 
test('test if charges can be made that exceed credit limit', ()=> {
    new_card.card_swipe('charge', 1300, new Date());
    expect(new_card.get_balance_as_of_date()).toEqual(0)
    expect(new_card.swipe_history[0].swipe_approved).toBe(false)
})
// transaction tests;
// test('check for past transactions', ()=> {
//     // expect(new_card.get_balance_as_of_date()).toBe(0);
//     new_card.card_swipe('charge', 500);
//     expect(new_card.get_trans().length).toBe(2);
// })

test('Saturday card_swipe', ()=> {
    expect(date_helper.check_swipe_post_date(saturday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
});
test('Sunday card_swipe', ()=> {
    expect(date_helper.check_swipe_post_date(sunday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
});
test('bank after_hours card_swipe', ()=> {
    expect(date_helper.check_swipe_post_date(after_hours)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
});
test('during business hours card_swipe', () => {
    expect(date_helper.check_swipe_post_date(new Date("November 20, 2018 08:00:01"))).toEqual(new Date("November 20, 2018 08:00:01"))
})
test('Friday after-hours card_swipe', ()=> {
    expect(date_helper.check_swipe_post_date(friday_after_hours)).toEqual(new Date(friday_after_hours));
})