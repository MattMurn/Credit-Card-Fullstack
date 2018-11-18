const Card = require('./Card');
// new_card with 35% apr, 1000 limit, created on 9/17/18;
// test data
// I set this up using the Date() object. Didn't want to use an api.
let open_date = new Date("October 18, 2018 11:13:00");// 0 days
let second_transaction_date = new Date("November 2, 2018 15:13:20"); // 15 days
let third_transaction_date = new Date("November 12, 2018 15:13:20"); // 25 days
let check_balance_date = new Date("November 17,2018 15:13:20"); // 30 days
// Fist Test Scenario
test('Test scenario 1', ()=> {
    let test_one = new Card(.35, 1000, open_date);
    test_one.card_transaction('charge', 500, open_date);

    expect(test_one.get_balance_as_of_date(third_transaction_date)).toBe(500)
    expect(test_one.get_balance_as_of_date(check_balance_date)).toBe(514.38);
})
//Second Test Scenario
test('test scenario 2', ()=> {
    let test_two = new Card(.35, 1000, open_date);

    test_two.card_transaction('charge', 500,open_date);
    expect(test_two.get_balance_as_of_date(second_transaction_date)).toBe(500);
    
    test_two.card_transaction('payment', 200, second_transaction_date);
    expect(test_two.get_balance_as_of_date(third_transaction_date)).toBe(300);

    test_two.card_transaction('charge', 100, third_transaction_date);
    expect(test_two.get_balance_as_of_date(check_balance_date)).toBe(411.99);
})
