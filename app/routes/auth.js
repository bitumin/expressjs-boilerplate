module.exports = function(app, express, passport, authBaseUrl) {

  var authRouter = express.Router();

  // AUTH OPTIONS
  authRouter.get('/', function(req, res) {
    res.render('auth/index');
  });

  // PROFILE
  authRouter.get('/profile', isLoggedIn, function(req, res) {
    res.render('auth/profile', {
      user : req.user
    });
  });

  // LOGOUT
  authRouter.get('/logout', function(req, res) {
    req.logout();
    res.redirect(authBaseUrl);
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally ----------------------------------------------------------------

  // LOGIN ===============================
  // show the login form
  authRouter.get('/login', function(req, res) {
    res.render('auth/login', { message: req.flash('loginMessage') });
  });
  // process the login form
  authRouter.post('/login', passport.authenticate('local-login', {
    successRedirect : authBaseUrl+'/profile', // redirect to the secure profile section
    failureRedirect : authBaseUrl+'/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  authRouter.get('/signup', function(req, res) {
    res.render('auth/signup', { message: req.flash('loginMessage') });
  });
  // process the signup form
  authRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect : authBaseUrl+'/profile', // redirect to the secure profile section
    failureRedirect : authBaseUrl+'/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // facebook ----------------------------------------------------------------

  // send to facebook to do the authentication
  authRouter.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
  // handle the callback after facebook has authenticated the user
  authRouter.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // twitter ----------------------------------------------------------------

  // send to twitter to do the authentication
  authRouter.get('/twitter', passport.authenticate('twitter', { scope : 'email' }));
  // handle the callback after twitter has authenticated the user
  authRouter.get('/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // google ----------------------------------------------------------------

  // send to google to do the authentication
  authRouter.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  // the callback after google has authenticated the user
  authRouter.get('/google/callback',
    passport.authenticate('google', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // instagram ----------------------------------------------------------------

  // send to instagram to do the authentication
  authRouter.get('/instagram', passport.authenticate('instagram', { scope : 'email' }));
  // the callback after instagram has authenticated the user
  authRouter.get('/instagram/callback',
    passport.authenticate('instagram', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // github ----------------------------------------------------------------

  // send to github to do the authentication
  authRouter.get('/github', passport.authenticate('github', { scope : 'email' }));
  // the callback after github has authenticated the user
  authRouter.get('/github/callback',
    passport.authenticate('github', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  // locally ----------------------------------------------------------------
  authRouter.get('/connect/local', function(req, res) {
    res.render('auth/connect-local', { message: req.flash('loginMessage') });
  });
  authRouter.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : authBaseUrl+'/profile', // redirect to the secure profile section
    failureRedirect : authBaseUrl+'/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // facebook ---------------------------------------------------------------

  // send to facebook to do the authentication
  authRouter.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
  // handle the callback after facebook has authorized the user
  authRouter.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // twitter --------------------------------

  // send to twitter to do the authentication
  authRouter.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
  // handle the callback after twitter has authorized the user
  authRouter.get('/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );


  // google ---------------------------------

  // send to google to do the authentication
  authRouter.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
  // the callback after google has authorized the user
  authRouter.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // instagram ---------------------------------------------------------------

  // send to instagram to do the authentication
  authRouter.get('/connect/instagram', passport.authorize('instagram', { scope : 'email' }));
  // handle the callback after instagram has authorized the user
  authRouter.get('/connect/instagram/callback',
    passport.authorize('instagram', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // github ---------------------------------------------------------------

  // send to github to do the authentication
  authRouter.get('/connect/github', passport.authorize('github', { scope : 'email' }));
  // handle the callback after github has authorized the user
  authRouter.get('/connect/github/callback',
    passport.authorize('github', {
      successRedirect : authBaseUrl+'/profile',
      failureRedirect : authBaseUrl
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -------------------------------------------------------------------

  authRouter.get('/unlink/local', function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // facebook ---------------------------------------------------------------

  authRouter.get('/unlink/facebook', function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // twitter ----------------------------------------------------------------

  authRouter.get('/unlink/twitter', function(req, res) {
    var user           = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // google -----------------------------------------------------------------

  authRouter.get('/unlink/google', function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // instagram ---------------------------------------------------------------

  authRouter.get('/unlink/instagram', function(req, res) {
    var user            = req.user;
    user.instagram.token = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // github ---------------------------------------------------------------

  authRouter.get('/unlink/github', function(req, res) {
    var user            = req.user;
    user.github.token = undefined;
    user.save(function(err) {
      res.redirect(authBaseUrl+'/profile');
    });
  });

  // register routes with their proper URL base
  app.use(authBaseUrl, authRouter);
};

// ensure user is logged in (passed to profile route)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect(authBaseUrl);
}