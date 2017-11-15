const db = require('../libs/db-client');

module.exports.getAll = async (ctx) => {
  ctx.body = db.getAllMailboxes();
};
