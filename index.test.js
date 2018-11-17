const Card = require('./Card');

let tester = new Card(.35, 1000);
tester.card_transaction('charge', 800);

test('interest calculated correctly', ()=> {
    expect(tester.calc_interest())
})
test('this is the first test in card', () => {
    expect(tester.get_trans()).toEqual(true);
})
