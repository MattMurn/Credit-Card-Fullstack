
//Other test suites 
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
// // non business hour card_swipes
// test('Saturday card_swipe', ()=> {
//     expect(date_helper.check_swipe_post_date(saturday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
// });
// test('Sunday card_swipe', ()=> {
//     expect(date_helper.check_swipe_post_date(sunday)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
// });
// test('bank after_hours card_swipe', ()=> {
//     expect(date_helper.check_swipe_post_date(after_hours)).toEqual(new Date('2018-11-20T06:00:00.001Z'));    
// });
// test('during business hours card_swipe', () => {
//     expect(date_helper.check_swipe_post_date(new Date("November 20, 2018 08:00:01"))).toEqual(new Date("November 20, 2018 08:00:01"))
// })
// test('Friday after-hours card_swipe', ()=> {
//     expect(date_helper.check_swipe_post_date(friday_after_hours)).toEqual(new Date(friday_after_hours));
// })