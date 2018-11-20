/* 
create a test suite that does the following:
takes in the Avant challenges transactions with fixed dates
+++
check balance after 35 days. 
make another transaction after 40 days.
check balance at 45 days
check balance at 60 days 
check balance at 65 days
*/
let day_35 = new Date("November 22,2018 15:13:20"); // 35 days
let day_40 = new Date("December 2,2018 15:13:20"); //45 days
let day_60 = new Date("December 22,2018 15:13:20"); //60 days
let day_65 = new Date("December 27, 2018 15:13:20") //65 days

test('see above', ()=> {
    let test_two = new Card(.35, 1000, open_date);
    test_two.card_transaction('charge', 500,open_date);
    expect(test_two.get_balance_as_of_date(second_transaction_date)).toBe(500);
    test_two.card_transaction('payment', 200, second_transaction_date);
    expect(test_two.get_balance_as_of_date(third_transaction_date)).toBe(300);
    test_two.card_transaction('charge', 100, third_transaction_date);
    expect(test_two.get_balance_as_of_date(check_balance_date)).toBe(411.99);
    expect(test_two.get_balance_as_of_date(day_35)).toBe(411.99);
    test_two.card_transaction('charge', 300, day_40);
    expect(test_two.check_balance_date(day_45)).toBe(411.99);
    expect(test_two.check_balance_date(day_60)).toBe('calc interest');
    expect(test_two.check_balance_date(day_65)).toBe('same as day 60');
})