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

if (isProduction) {
  const isNotAPIRoutePath = /^(?!.*\/api).*$/;
  router.get(isNotAPIRoutePath, async (ctx) => {
    await send(ctx, './dist/index.html');
  });
}

module.exports = app;
