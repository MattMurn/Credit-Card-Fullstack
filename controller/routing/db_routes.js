let query_functions = require('../../controller/query_functions');

module.exports = app => {
  app.get('/test', (req, res) => {
    // return query_functions.get_customer_info();
    console.log('hit')
    let x = {"avant": "object"}
    res.send(x)
    // return 'hello world'
  })
  app.post('/test/post', (req, res) => {
    console.log(req.body);
  })
}

