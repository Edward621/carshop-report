const mongoose = require('mongoose');
const logger = require('./util/logger');

module.exports = (connStr)=>{
  mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, reply)=>{
    if (err) {
      logger.log(err.message);
    } else {
      logger.log('connected to db');
    }
  });
}
