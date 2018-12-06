let query_functions = require('../../controller/query_functions');

module.exports = app => {
  app.get('/test', (req, res) => {
    return query_functions.get_customer_info();
  })
}