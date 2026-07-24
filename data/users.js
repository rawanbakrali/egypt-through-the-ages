// data/users.js
//
// TEMPORARY mock user store — plain in-memory array, plaintext passwords.
// This is NOT secure and is only a stand-in until real MongoDB + password
// hashing (bcrypt) work happens, per roadmap Section 10/11/12.
// Resets to just these 2 seeded accounts every time the server restarts.

const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@test.com',
    password: 'admin123', // PLAINTEXT — temporary only, see note above
    role: 'admin'
  },
  {
    id: 2,
    username: 'testuser',
    email: 'user@test.com',
    password: 'user123', // PLAINTEXT — temporary only, see note above
    role: 'user'
  }
];

module.exports = users;