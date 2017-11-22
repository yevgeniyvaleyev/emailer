import db from '../libs/db-client';

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  // error.status = status;
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
  const areAllEmailsExist = ids.every((id) => db.findEmailById(id))

  if (!areAllEmailsExist) {
    generateCustomError('Some emails do not exist', 404);
  }

  ctx.body = ids.every((id) => db.deleteEmail(id));
};

module.exports.delete = async (ctx) => {
  const boxid = Number(ctx.params.boxid);
  const id = Number(ctx.params.id);

  if (!db.findEmailById(id)) {
    generateCustomError('Email does not exist', 404);
  }

  ctx.body = db.deleteEmail(id);
};

module.exports.send = async (ctx) => {
  const boxid = Number(ctx.params.boxid);
  const {
    to,
    subject,
    body
  } = ctx.request.body;

  if (!to) {
    generateCustomError('Invalid email data', 400);
  }

  const emailData = {
    to,
    body: body || '',
    subject: subject || ''
  };

  const user = db.findUserByEmail(to, boxid);
  if (!user) {
    db.addUser({ email: to, name: '' }, boxid);
  }
  ctx.body = db.addEmail(emailData, boxid);
};



module.exports.get = async (ctx) => {
  const email = db.findEmailById(ctx.params.id);

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
