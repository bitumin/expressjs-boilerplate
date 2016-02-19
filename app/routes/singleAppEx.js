module.exports = function(app) {

  app.get('/single', function(req, res) {
    res.render('single/index');
  });

};
