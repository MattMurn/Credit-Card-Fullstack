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
let after_hours = new Date("November 19, 2018 17:00:01");
// let moment_test = moment();
// Fist Test Scenario
test('Test scenario 1', ()=> {
    let test_one = new Card(.35, 1000, open_date);
    test_one.card_transaction('charge', 500, first_transaction_date);

    expect(test_one.get_current_balance(check_balance_date)).toBe(514.38);
})
test(`test scenario 2`, ()=> {
    let test_two = new Card(.35, 1000, open_date);
    test_two.card_transaction('charge', 500,first_transaction_date);
    test_two.card_transaction('payment', 200, second_transaction_date);
    test_two.card_transaction('charge', 100, third_transaction_date);

    expect(test_two.get_current_balance(check_balance_date)).toBe(411.99);
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
    new_card.card_transaction('charge', 1300, new Date());
    expect(new_card.get_current_balance()).toEqual(0)
    expect(new_card.card_tranactions[0].swip_approved).toBe(false)
})
// transaction tests;
test('check for past transactions', ()=> {
    // expect(new_card.get_current_balance()).toBe(0);
    new_card.card_transaction('charge', 500);
    expect(new_card.get_trans().length).toBe(2);
})
// test('reducer method to get difference in days between transactions',()=> {
//     new_card.card_transaction('charge', 500, new Date(2018, 9, 18, 10, 33, 30, 0));
//     new_card.card_transaction('payment', 200, new Date(2018, 10, 2, 10, 33, 30, 0));
//     new_card.card_transaction('charge', 100, new Date(2018, 10, 12, 10, 33, 30, 0));
//     new_card.get_current_balance();
// })
// weekend post test / moment v Date() object
// test('is swip_day on the weekend', ()=> {
//     expect(new_card.moment(moment_test.day())).toBe(true);
// });
test('is swip_day on the weekend', ()=> {
    expect(new_card.check_swip_day(saturday)).toBe(1);    
});
test('is swip_day on the weekend', ()=> {
    expect(new_card.check_swip_day(sunday)).toBe(1);    
});
test('is swip occuring during bank hours', ()=> {
    expect(new_card.check_swip_time(after_hours)).toBe('2018-11-20T02:00:01.000Z');
})