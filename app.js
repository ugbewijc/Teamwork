require('dotenv').config();
const express = require('express');
const { logger } = require('./middlewares');
const { apiRouter } = require('./routes');

const app = express();
const port = process.env.PORT || '3000';

/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); */
app.use(express.json());

app.get('/', (req, res) => {
  // res.json({ email: 'my email', password: 'my password' });
  res.send('Welcome to DevC Challenge 2019');
});

app.use('/api', apiRouter); // route to api

app.listen(port, () => {
  logger.info(` Listening on port: ${port} `);
});
