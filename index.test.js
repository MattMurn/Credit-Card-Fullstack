const Card = require('./Card');

let new_card = new Card(.35, 1000);
let test_transaction = {
    trans_id: Math.random(),
    trans_type: 'charge',
    trans_time: 'October 16, 2018 23:15:30',
    trans_amount: 400,
    interest_adjusted: null
}

//interest tests;
test('test calc_interest method to see if math is correct', () => {
    expect(new_card.calc_interest(500, 30)).toEqual(14.38);
    expect(new_card.calc_interest(500,15)).toEqual(7.19);
    expect(new_card.calc_interest(300, 10)).toEqual(2.88);
    expect(new_card.calc_interest(400, 5)).toBe(1.92)
})
// test('bal.ance returns interest adjusted balance', ()=> {
    // new_card.card_transaction('charge', 500);
    // expect(new_card.get_current_balance()).toBe(514.38);

// })
// transaction tests;
// test('payment functionality', ()=> {
    // expect(new_card.card_tranaction('payment', 300).toBe(true));
// })
// test('check for past transactions', ()=> {
    // expect(new_card.get_current_balance()).toBe(0);
    // new_card.card_transaction('charge', 500);
    // expect(new_card.get_trans().length).toBe(1)
    // expect(new_card.get_current_balance()).toBe(500);
// })

// test(`test scenario 2 - customer CHARGES $500 on opening day, 
//     15 days after open, PAYS $200, 25 days CHARGES $100, 
//     total outstanding balance after 30 days is $411.99,
// `, 
    // ()=> {
        // new_card.card_transaction('charge', 500);
        // new_card.card_transaction('payment', 200);
        // new_card.card_transaction('charge', 100);
        // expect(new_card.get_current_balance()).toBe(411.99);
// })

test('reducer method to get difference in days between transactions',()=> {
    new_card.card_transaction('charge', 500, new Date(2018, 9, 18, 10, 33, 30, 0));
    new_card.card_transaction('payment', 200, new Date(2018, 10, 2, 10, 33, 30, 0));
    new_card.card_transaction('charge', 100, new Date(2018, 10, 12, 10, 33, 30, 0));
    new_card.get_current_balance();
})