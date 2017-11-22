import generateId from './generate-id';
import db from './fake-db';

const requiredUserFields = ['email'];
const requiredEmailFields = ['to'];

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

function hasRequiredFields(data, fields) {
  return fields.every((field) => data[field] !== undefined);
}

function generateUser(data, boxId) {
  if (!hasRequiredFields(data, requiredUserFields)) {
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

function generateSentEmail(data, boxId) {
  if (!hasRequiredFields(data, requiredEmailFields)) {
    throw new Error('Data for new email is invalid');
  }
  const user = {
    to: data.to,
    id: generateId(),
    status: db.emailStates.sent,
    from: findById(boxId, 'mailboxes').email,
    subject: data.subject,
    body: data.body,
    date: new Date().toUTCString(),
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

function addEmail (emailData, boxId) {
  const email = generateSentEmail(emailData, boxId);
  db.emails.push(email);
  return true;
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

function updateUser(data, id, boxId) {
  const user = findUserById(id);
  Object.assign(user, data);
  return user;
}

function deleteUser(id) {
  return removeById(id, 'users');
}

function findUserByEmail(email, boxid) {
  return getAllUsers(boxid).find((user) => user.email === email);
}

function getAllMailboxes() {
  return db.mailboxes;
}

export default {
  getAllEmails,
  findEmailById,
  findEmailByType,
  searchEmails,
  addEmail,
  deleteEmail,

  getAllUsers,
  updateUser,
  findUserById,
  findUserByEmail,
  addUser,
  deleteUser,

  getAllMailboxes
};

