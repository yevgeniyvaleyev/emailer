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
  const requiredFields = ['fullName', 'birthdate', 'email'];

  return requiredFields.every((field) => data[field] !== undefined);
}

function generateUser(data) {
  if (!hasRequiredFields(data)) {
    throw new Error('Data for new user is invalid');
  }
  const user = {
    fullName: data.fullName,
    birthdate: new Date(data.birthdate).toUTCString(),
    id: generateId(),
    email: data.email,
    gender: data.gender
  };
  return user;
}

function getAllEmails() {
  return db.emails;
}

function findEmailById(id) {
  return findById(id, 'emails');;
}

function findEmailByType(type) {
  return db.emails.filter((email) => email.status === type);
}

function getAllUsers() {
  return db.users;
}

function findUserById(id) {
  return findById(id, 'users');
}

function addUser(data) {
  const user = generateUser(data);
  db.users.push(user);
  return user;
}

function deleteUser(id) {
  return removeById(id, 'users');
}

module.exports = {
  getAllEmails,
  findEmailById,
  findEmailByType,
  getAllUsers,
  findUserById,
  addUser,
  deleteUser
};

