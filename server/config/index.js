var config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000
}

var nodeEnv = require('./'+config.env);

module.exports = {...config, ...nodeEnv};
