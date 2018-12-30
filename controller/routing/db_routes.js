let query_functions = require('../../controller/query_functions');
const db = require('../../model/sequelize/models');

module.exports = app => {

  app.get('/allCustomers', (req, res) => {
    query_functions.get_all_customers()
    .then(data => res.send(data));
  });
  app.post('/customerCards', (req, res) => {
    let id = req.body.id;
    // console.log(req.body.id)
   query_functions.get_card_data(id)
    .then( data => {
      // console.log(data);
      res.send(data)
    });
  })
  app.post('/cardTransactions', (req, res) => {
    console.log(req.body)
    query_functions.get_transactions(req.body.id)
    .then(data => res.send(data));

  })
  app.post('/currentAction', (req, res) => {
    // let req.body = req.body;
    switch(req.body.modal_type){
      case 'new_customer':
        query_functions.create_new_customer(req.body);
        break;
      case 'new_card':
        let new_card_obj = req.body;
        req.body.current_balance = 0;
        // console.log(req.body);
        query_functions.create_new_card(req.body);
        break;
      case 'new_transaction':
      // check the format of the start_date property against the js Date() object.
        console.log('THIS IS THE BODY OF THE DB_ROUTES', req.body)
        let new_balance;
        if(req.body.transaction_type === 'charge'){
          new_balance = Math.round((parseFloat(req.body.amount) + req.body.current_balance)*100)/100;
        }
        if(req.body.transaction_type === 'payment'){
          new_balance = Math.round((req.body.current_balance - parseFloat(req.body.amount))*100)/100;
        }
        req.body.current_balance = new_balance;
        query_functions.create_new_transaction(req.body);
        query_functions.udpate_card_balance(req.body.current_balance, req.body.card_id);
        /* this is probably where you want to bring in the logic from that 
        Card class and then
        console.log('new transaction hit')
            transaction_id: DataTypes.FLOAT, auto generated
            card_id: DataTypes.INTEGER, object
            transaction_type: DataTypes.STRING, object
            transaction_timestamp: DataTypes.STRING objec
            post_date: DataTypes.STRING, after accrued
            transaction_amount: DataTypes.FLOAT, object
            current_balance: DataTypes.FLOAT, object
            interest_accrued: DataTypes.FLOAT, after accrued
            transaction_approved: DataTypes.STRING checked in 
        */
    }
  })
}

