const db = require('../model/sequelize/models');

module.exports = {
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
      current_balance: instance.current_balance,
      interest_accrued: 0,
      createdAt: instance.open_date
    })
  },
  create_new_transaction: instance => {

    db.transactions.create({
      transaction_id: instance.id,
      card_id: instance.card_id,
      transaction_type: instance.transaction_type,
      transaction_timestamp: instance.transaction_timestamp,
      transaction_amount: instance.transaction_amount,
      current_balance: instance.current_balance,
      interest_accrued: null,
      transaction_approved: null
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
  get_card_data: id => {

    return db.cards.findAll({
      where: {
        customer_id: id
      }
    });
  },
  get_transactions: id => {
    return db.transactions.findAll({
      where: {
        card_id: id
      },
      order: 
        [['id', 'DESC']]
    })
    .then(transactions => {
      return transactions;
    })
  },
  get_all_customers: () => {

    return db.customers.findAll({})
    .then(customers => {
      let all_customers = []
      customers.map((el, i)=> all_customers.push(el))
      return all_customers;
    });
  },
  udpate_card_balance: (current_balance, card_id) => {

    db.cards.update(
      { current_balance: current_balance },
      { where:
        { id: card_id } 
      }
    );
  }
}