const jwt = require('express-jwt');
const config = require('../config/global');

module.exports = jwt({
  secret: config.jwt_secret_key,
  credentialsRequired: false,
});
