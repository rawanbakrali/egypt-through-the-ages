// data/users.js
//
// TEMPORARY mock user store 

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