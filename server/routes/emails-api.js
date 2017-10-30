const db = require('../libs/db-client');
const argv = require('yargs').argv;

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  error.status = status;
  throw error;
}

module.exports.getAll = async (ctx) => {
  ctx.body = db.getAllEmails();
};

module.exports.get = async (ctx) => {
  const email = db.findEmailById(ctx.params.id);

  if (!email) {
    generateCustomError('Email does not exist', 404);
  }

  ctx.body = email;
};

module.exports.getAllByType = async (ctx) => {
  const email = db.findEmailByType(ctx.params.type);

  if (!email) {
    generateCustomError('Email does not exist', 404);
  }

  ctx.body = email;
};
