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
      }
    })
    .then(transactions => {
      let log = {};
      transactions.map((element, i)=> {
        log[i] = element.dataValues;
      })
      // console.log(log);
      return log;
    })
    /*
    this should be used only when a user wants to see transactions
    after clicking through a on a certain card.
    */
  },
  get_all_customers: () => {
    return db.customers.findAll({})
    .then(customers => {
      let all_customers = []
      customers.map((el, i)=> all_customers.push(el))
      // console.log(all_customers)
      return all_customers;
    });
  }
}