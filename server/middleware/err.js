const logger = require('../util/logger');

module.exports = (app)=>{
  app.use((err, req, res, next) => {
    let status = req.errStatus ? req.errStatus : 500;
    logger.log(err.message);
    res.status(status).send(err.message);
  });
}
