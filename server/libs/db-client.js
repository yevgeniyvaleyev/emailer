const generateId = require('./generate-id');
const db = require('./fake-db');

function getAllEmails() {
  return db.emails;
}

function findEmailById(id) {
  const parsedId = parseInt(id, 10);
  return db.emails.find((email) => email.id === parsedId);
}

function findEmailByType(type) {
  return db.emails.filter((email) => email.status === type);
}

module.exports = {
  getAllEmails,
  findEmailById,
  findEmailByType
};

