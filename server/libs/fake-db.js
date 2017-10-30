const generateId = require('./generate-id');

const emailStates = {
  inbox: 'inbox',
  spam: 'spam',
  draft: 'draft',
  sent: 'sent'
}

module.exports.emailStates = emailStates;

module.exports = {
  emails: [
    {
      id: generateId(),
      status: emailStates.inbox,
      subject: "Some title 1",
      from: "test@test.com",
      to: "example@test.com",
      date: "Sun Oct 29 2017 20:41:57 GMT+0100 (CET)",
      body: "This is a body of an email 1"
    },
    {
      id: generateId(),
      status: emailStates.inbox,
      subject: "Some title foo",
      from: "test@test.com",
      to: "example@test.com",
      date: "Sun Oct 29 2017 20:41:57 GMT+0100 (CET)",
      body: "This is a body of an email "
    },
    {
      id: generateId(),
      status: emailStates.spam,
      subject: "Some spam title 2",
      from: "test@test.com",
      to: "example@test.com",
      date: "Sun Oct 29 2017 20:41:57 GMT+0100 (CET)",
      body: "This is a body of an email 1"
    },
    {
      id: generateId(),
      status: emailStates.draft,
      subject: "Some draft title 3",
      from: "test@test.com",
      to: "example@test.com",
      date: "Sun Oct 29 2017 20:41:57 GMT+0100 (CET)",
      body: "This is a body of an email 1"
    },
    {
      id: generateId(),
      status: emailStates.sent,
      subject: "Some sent title 4",
      from: "test@test.com",
      to: "example@test.com",
      date: "Sun Oct 29 2017 20:41:57 GMT+0100 (CET)",
      body: "This is a body of an email 1"
    }
  ],
};
