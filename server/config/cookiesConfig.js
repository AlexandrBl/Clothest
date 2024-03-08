const jwtConfig = require('./jwtConfig');

const cookiesConfig = {
  httpOnly: true,
  refresh: 'refresh',
  access: 'access',
  maxAgeAccess: jwtConfig.access.expiresIn,
  maxAgeRefresh: jwtConfig.refresh.expiresIn,
};
module.exports = cookiesConfig;
