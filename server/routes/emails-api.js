const db = require('../libs/db-client');
const argv = require('yargs').argv;

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  error.status = status;
  throw error;
}

module.exports.getAll = async (ctx) => {
  ctx.body = db.getAllEmails(Number(ctx.params.boxid));
};

module.exports.search = async (ctx) => {
  ctx.body = db.searchEmails(ctx.query.term, ctx.query.type, Number(ctx.params.boxid));
};

module.exports.deleteSelected = async (ctx) => {
  const boxid = Number(ctx.params.boxid);
  const ids = JSON.parse(ctx.query.ids);
  const areAllEmailsExist = ids.every((id) => db.findEmailById(id, boxid))

  ctx.body = areAllEmailsExist ?
     ids.every((id) => db.deleteEmail(id, boxid)) :
     areAllEmailsExist;
};

module.exports.get = async (ctx) => {
  const email = db.findEmailById(ctx.params.id, Number(ctx.params.boxid));

  if (!email) {
    generateCustomError('Email does not exist', 404);
  }

  ctx.body = email;
};

module.exports.getAllByType = async (ctx) => {
  const email = db.findEmailByType(ctx.params.type, Number(ctx.params.boxid));

  if (!email) {
    generateCustomError('Email does not exist', 404);
  }

  ctx.body = email;
};
