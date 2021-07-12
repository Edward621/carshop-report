const app = require('./src/app');
const config = require('./config');
const logger = require('./util/logger');

app.listen(config.port, ()=>{
  logger.log(`in ${config.env} mode`);
  logger.log(`running on port ${config.port}`);
});
