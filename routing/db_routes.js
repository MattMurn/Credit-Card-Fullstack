send_transaction_history = array => {

    array.map((element, i)=> {
      console.log(typeof(element.transaction_timestamp))
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
  }
  create_new_card = instance => {

    db.cards.create({
      customer_id: instance.customer_id,
      apr: instance.apr,
      credit_limit: instance.credit_limit,
      current_balance: instance.balance,
      interest_accrued: 0,
      createdAt: instance.open_date
    })
  }
  get_by_id = num => {
      
    db.customers.findAll({
      where: {
        id: num
      }
    }).then( data => {
      console.log(data[0].dataValues)
      return data;
    })
  }