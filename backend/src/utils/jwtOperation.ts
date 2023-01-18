import * as config from '../config/global';

const jwt = require('jsonwebtoken');

export const generateToken = async (payload) => {

  return await jwt.sign(
    {...payload},
    config.jwt_secret_key,
    {
      // expiresIn: config.jwt_expire_time
    }
  );
};