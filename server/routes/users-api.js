const db = require('../libs/db-client');
const argv = require('yargs').argv;

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  error.status = status;
  throw error;
}

module.exports.getAll = async (ctx) => {
  ctx.body = db.getAllUsers(Number(ctx.params.boxid));
};

module.exports.get = async (ctx) => {
  const item = db.findUserById(ctx.params.id, Number(ctx.params.boxid));

  if (!item) {
    generateCustomError('User does not exist', 404);
  }

  ctx.body = item;
};

module.exports.getAllUsersByEmail = async (ctx) => {
  const users = db.getAllUsers(Number(ctx.params.boxid));

  ctx.body = users.filter(user => user.email === ctx.params.email);
};

module.exports.put = async (ctx) => {
  const {
    fullName,
    email,
  } = ctx.request.body;

  // TODO: add proper email validator
  // TODO: add proper full name validator

  if (!fullName || !email) {
    generateCustomError('Invalid user data', 400);
  }

  const userData = {
    fullName,
    email
  };
  ctx.body = db.addUser(userData, Number(ctx.params.boxid));
};

module.exports.delete = async (ctx) => {
  const item = db.findUserById(ctx.params.id, Number(ctx.params.boxid));

    if (!item) {
      generateCustomError('User does not exist', 404);
    }

    ctx.body = db.deleteUser(item.id, Number(ctx.params.boxid));
};
