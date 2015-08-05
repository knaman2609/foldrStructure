var mock = require('./mock.js');

module.exports = function(app) {
  app.get('/',function(req, res) {
    res.render('contacts.html');
  });

  app.get('/users',function(req, res) {
  	res.send(mock.users);
  });
}