import generateId from './generate-id';

const emailStates = {
  inbox: 'inbox',
  spam: 'spam',
  draft: 'draft',
  sent: 'sent'
}

function getSender (boxid) {
  return mailboxes.find(mailboxe => mailboxe.id === boxid).email
}

const mailboxes = [
  {
    id: 0,
    email: "main@example.com",
    alias: "main"
  },
  {
    id: 1,
    email: "second@example.com",
    alias: "second"
  }
]

module.exports.emailStates = emailStates;

const emails = [
  {
    id: generateId(),
    boxId: 0,
    status: emailStates.inbox,
    subject: "Some title 1",
    from: getSender(0),
    to: "example@test.com",
    date: new Date().toUTCString(),
    body: "This is a body of an email 1"
  },
  {
    id: generateId(),
    boxId: 0,
    status: emailStates.inbox,
    subject: "Some title foo",
    from: getSender(0),
    to: "example@test.com",
    date: new Date().toUTCString(),
    body: "This is a body of an email "
  },
  {
    id: generateId(),
    boxId: 0,
    status: emailStates.spam,
    subject: "Some spam title 2",
    from: getSender(0),
    to: "example@test.com",
    date: new Date().toUTCString(),
    body: "This is a body of an email 1"
  },
  {
    id: generateId(),
    boxId: 0,
    status: emailStates.draft,
    subject: "Some draft title 3",
    from: getSender(0),
    to: "example@test.com",
    date: new Date().toUTCString(),
    body: "This is a body of an email 1"
  },
  {
    id: generateId(),
    boxId: 1,
    status: emailStates.sent,
    subject: "Some sent title 4",
    from: getSender(1),
    to: "example@test.com",
    date: new Date().toUTCString(),
    body: "This is a body of an email 1"
  }
];

interface IUser {
  id: number
  name?: string
  birthdate?: string
  gender?: string
  email: string
  boxId: number
}

const users: IUser[] = [
  {
    id: generateId(),
    name: "Sam Smith",
    birthdate: new Date().toUTCString(),
    gender: 'female',
    email: "sam@example.com",
    boxId: 0
  },
  {
    id: generateId(),
    name: "Mike Rosendal",
    birthdate: new Date().toUTCString(),
    gender: 'male',
    email: "mike@example.com",
    boxId: 0
  },
  {
    id: generateId(),
    name: "Mike Rosendal",
    birthdate: new Date().toUTCString(),
    gender: 'male',
    email: "mike@example.com",
    boxId: 1
  },
]

export default {
  emails,
  users,
  mailboxes,
  emailStates
};
