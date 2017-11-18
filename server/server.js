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
const mailboxesApi = require('./routes/mailboxes-api');
const app = new Koa();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach((middleware) => {
  // eslint-disable-next-line global-require
  app.use(require(`./middlewares/${middleware}`));
});

const router = new Router();

app.use(router.routes());

const baseUrl = '/api/mailboxes';
const boxUrl = `${baseUrl}/:boxid`;

router.get(baseUrl, mailboxesApi.getAll);

router.get(`${boxUrl}/emails`, emailsApi.getAll);
router.get(`${boxUrl}/emails/search`, emailsApi.search);
router.get(`${boxUrl}/emails/:id`, emailsApi.get);
router.get(`${boxUrl}/emails/type/:type`, emailsApi.getAllByType);
router.delete(`${boxUrl}/emails`, emailsApi.deleteSelected);
router.delete(`${boxUrl}/emails/:id`, emailsApi.delete);

router.get(`${boxUrl}/contacts`, usersApi.getAll);
router.get(`${boxUrl}/contacts/by-email/:email`, usersApi.getAllUsersByEmail);
router.get(`${boxUrl}/contacts/:id`, usersApi.get);
router.delete(`${boxUrl}/contacts/:id`, usersApi.delete);
router.post(`${boxUrl}/contacts`, usersApi.add);
router.put(`${boxUrl}/contacts/:id`, usersApi.update);

module.exports = app;
