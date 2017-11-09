const db = require('../libs/db-client');
const argv = require('yargs').argv;

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  error.status = status;
  throw error;
}

module.exports.getAll = async (ctx) => {
  ctx.body = db.getAllUsers();
};

module.exports.get = async (ctx) => {
  const item = db.findUserById(ctx.params.id);

  if (!item) {
    generateCustomError('User does not exist', 404);
  }

  ctx.body = item;
};

module.exports.put = async (ctx) => {
  const {
    fullName,
    birthdate,
    email,
    gender
  } = ctx.request.body;

  // TODO: add proper email validator
  // TODO: add proper full name validator

  if (!fullName || !gender || !email || isNaN(new Date(birthdate).valueOf())) {
    generateCustomError('Invalid user data', 400);
  }

  const userData = {
    fullName,
    birthdate,
    email,
    gender
  };
  ctx.body = db.addUser(userData);
};

module.exports.delete = async (ctx) => {
  const item = db.findUserById(ctx.params.id);

    if (!item) {
      generateCustomError('User does not exist', 404);
    }

    ctx.body = db.deleteUser(item.id);
};
