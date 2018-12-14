let query_functions = require('../../controller/query_functions');
const db = require('../../model/sequelize/models');

module.exports = app => {

  app.get('/allCustomers', (req, res) => {
    query_functions.get_all_customers()
    .then(data => res.send(data));
  });
  app.post('/customerCards', (req, res) => {
    let id = req.body.id;
   query_functions.get_card_data(id)
    .then( data => res.send(data));
  })
  app.post('/cardTransactions', (req, res) => {

  })
  app.post('/currentAction', (req, res) => {
    console.log(req.body.model_type);
    let action_check = req.body;
    switch(action_check.model_type){
      case 'new_customer':
        query_functions.create_new_customer(action_check);
        break;
      case 'new_card':
        query_functions.create_new_card(action_check);
        break;
      case 'new_transaction':
        console.log(action_check)
        /* this is probably where you want to bring in the logic from that 
        Card class and then
        console.log('new transaction hit')
        */
    }
  })
}

