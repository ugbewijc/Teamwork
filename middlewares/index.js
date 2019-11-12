// import logger from './logger';
const logger = require('./logger');
const { auth, adminAuth } = require('./auth');
const { uploadM } = require('./multer');

module.exports = {
  logger, auth, adminAuth, uploadM,
};
