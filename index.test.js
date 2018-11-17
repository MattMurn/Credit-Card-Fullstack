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
})
test('balance returns interest adjusted balance', ()=> {
    // new_card.card_transaction('charge', 500);
    expect(new_card.get_current_balance()).toBe(514.38);
})
// transaction tests;
test('checking balance before and after transactions', ()=> {
    expect(new_card.get_current_balance()).toBe(0);
    new_card.card_transaction('charge', 500);
    expect(new_card.get_trans().length).toBe(1)
    expect(new_card.get_current_balance()).toBe(500);
})

