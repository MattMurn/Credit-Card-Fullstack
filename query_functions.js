const db = require('./sequelize/models');
// get customer data;
// get card(s);
// get transaction(s);
module.exports = {
user_id: null,
create_new_customer: instance => {
    db.customers.create({
        first_name: instance.first_name,
        last_name: instance.last_name,
        credit_score: instance.credit_score
    });
},
create_new_card: instance => {
  db.cards.create({
    customer_id: instance.customer_id,
    card_id: instance.card_id,
    apr: instance.apr,
    credit_limit: instance.credit_limit,
    current_balance: instance.balance,
    interest_accrued: 0,
    createdAt: instance.open_date
  })
},
send_transaction_history: array => {
  array.map((element, i)=> {
    db.transactions.create({
      transaction_id: element.transaction_id,
      card_id: element.card_id,
      transaction_type: element.transaction_type,
      transaction_timestamp: element.transaction_timestamp.toString(),// from Date obj
      post_date: element.post_date.toString(),// from Date obj
      transaction_amount: element.transaction_amount,
      current_balance: element.current_balance,
      interest_accrued: element.interest_accrued,
      transaction_approved: element.transaction_approved
    })
  })
},
get_card_info: id => {
    db.cards.findAll({
        where: {
          customer_id: id
        }
    })
    .then(data => { //this context is always going to be module.exports
    module.exports.loop_over_response(data);
    })
},
get_customer_info: (first, last) => {
    db.customers.findAll({
    where: {
      first_name: first,
      last_name: last
    }
  })  
  .then(function(data){
    //   console.log(data[0].dataValues.id); 
    // let test = data[0].dataValues.id;
      user_id = data[0].dataValues.id
      return user_id;
    })
},
loop_over_response: db_array => {
    let cards = {};
    db_array.map((element, i)=> { 
      cards[i] = element.dataValues;  
    })
    // console.log(cards);
    return cards;
  },
}