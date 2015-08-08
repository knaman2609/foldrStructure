var mock = require('./mock.js');

module.exports = function(app) {
  app.get('/',function(req, res) {
    res.render('contacts.html');
  });

  app.get('/login',function(req, res) {
    res.render('accounts/login.html');
  });

  app.get('/users',function(req, res) {
  	res.send(mock.users);
  });
}
