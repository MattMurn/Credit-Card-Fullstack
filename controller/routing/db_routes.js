let query_functions = require('../../controller/query_functions');
const db = require('../../model/sequelize/models');
module.exports = app => {

  app.get('/allUsers', (req, res) => {
    db.customers.findAll({})
    .then(customers => {
      let all_customers = []
      customers.map((el, i)=> all_customers.push(el))
       res.send(all_customers);
    });
  });
  app.post('/userCards', (req, res) => {
    console.log(req.body)
    let id = req.body.id;
    db.cards.findAll({
      where: {
        customer_id: id
      }
    })
    .then( data => res.send(data));
    // res.send('Thanks for sending...')
    // db.cards.findAll({
    //   where: {
    //     customer_id: req.body
    //   } 
    // })
    // .then(data => console.log(data));
  })
}

