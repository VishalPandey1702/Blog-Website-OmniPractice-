const bcrypt = require('bcryptjs');

const password = 'password'; // Replace with your desired password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash); // Copy this hash into your users array
});
