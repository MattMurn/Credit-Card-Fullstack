const db = require('./sequelize/models');
/*
create_new_costumer, create_new_card,
send_transaction_history, get_customer_info
*/
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
get_customer_info: (first, last) => {
  return db.customers.findAll({
    where: {
      first_name: first,
      last_name: last
    }
  })  
  .then(data => {
    return data[0].dataValues.id;
  })
  .then(user_id => {
    return db.cards.findAll({
      where: {
        customer_id: user_id
      }
    });
  })
  .then(card_data => {
    let cards = {}
    card_data.map((element, i)=> {
      cards[i] = element.dataValues; 
    })
    return cards;
  })
}
}