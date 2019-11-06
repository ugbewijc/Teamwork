// import logger from './logger';
const logger = require('./logger');
const { auth, adminAuth } = require('./auth');


// export { logger as Logger };
module.exports = { logger, auth, adminAuth };
