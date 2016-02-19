// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID'      : 'your-secret-clientID-here', // your App ID
    'clientSecret'  : 'your-client-secret-here', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey'       : 'your-consumer-key-here',
    'consumerSecret'    : 'your-client-secret-here',
    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID'      : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  },

  githubAuth: {
    clientID        : 'get_your_own',
    clientSecret    : 'get_your_own',
    callbackURL     : "http://127.0.0.1:1337/auth/github/callback"
  },

  instagramAuth: {
    clientID        : 'get_your_own',
    clientSecret    : 'get_your_own',
    callbackURL     : 'http://127.0.0.1:1337/auth/instagram/callback'
  }

};