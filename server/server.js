const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const convert = require('koa-convert');
const send = require('koa-send');

const Router = require('koa-router');
const argv = require('yargs').argv;

const isProduction = !!argv.production;
const emailsApi = require('./routes/emails-api');
const usersApi = require('./routes/users-api');
const app = new Koa();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach((middleware) => {
  // eslint-disable-next-line global-require
  app.use(require(`./middlewares/${middleware}`));
});

const router = new Router();

app.use(router.routes());

router.get('/api/emails', emailsApi.getAll);
router.get('/api/emails/:id', emailsApi.get);
router.get('/api/emails/type/:type', emailsApi.getAllByType);

router.get('/api/users', usersApi.getAll);
router.get('/api/users/by-email/:email', usersApi.getAllUsersByEmail);
router.get('/api/users/:id', usersApi.get);
router.delete('/api/users/:id', usersApi.delete);
router.put('/api/users', usersApi.put);

module.exports = app;
