const generateId = require('./generate-id');
const db = require('./fake-db');

function findById(id, type) {
  const parsedId = parseInt(id, 10);
  return db[type].find((item) => item.id === parsedId);
}

function removeById(id, type) {
  const parsedId = parseInt(id, 10);
  const initialLength = db[type].length;
  db[type] = db[type].filter((item) => item.id !== parsedId);

  return initialLength > db[type].length;
}

function hasRequiredFields(data) {
  const requiredFields = ['email'];

  return requiredFields.every((field) => data[field] !== undefined);
}

function generateUser(data, boxId) {
  if (!hasRequiredFields(data)) {
    throw new Error('Data for new user is invalid');
  }
  const user = {
    name: data.name,
    id: generateId(),
    email: data.email,
    boxId
  };
  return user;
}

function getAllEmails(boxId) {
  return db.emails.filter((email) => email.boxId === boxId);
}

function searchEmails(term, type, boxId) {
  return db.emails.filter((email) =>
    email.status === type &&
    boxId === email.boxId &&
    (email.subject.includes(term) || email.body.includes(term))
  );
}

function findEmailById(id) {
  return findById(id, 'emails');
}

function findEmailByType(type, boxId) {
  return db.emails.filter((email) =>
    email.status === type && boxId === email.boxId);
}

function deleteEmail(id) {
  return removeById(id, 'emails');
}

function getAllUsers(boxId) {
  return db.users.filter((user) => boxId === user.boxId);
}

function findUserById(id) {
  return findById(id, 'users');
}

function addUser(data, boxId) {
  const user = generateUser(data, boxId);
  db.users.push(user);
  return user;
}

function deleteUser(id) {
  return removeById(id, 'users');
}

function getAllMailboxes() {
  return db.mailboxes;
}

module.exports = {
  getAllEmails,
  findEmailById,
  findEmailByType,
  searchEmails,
  deleteEmail,
  getAllUsers,
  findUserById,
  addUser,
  deleteUser,
  getAllMailboxes
};

