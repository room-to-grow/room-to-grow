/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
// PAGE WAS TAKEN FROM USERMODEL IN UNIT11-AUTHENTICATION

// FIX THIS TO BE SQL INSTEAD
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  // console.log('encrypting password');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.log('error generating salt');
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) console.log('error generating hash');
      // console.log(hash);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.compare = function (guess, func) {
  bcrypt.compare(guess, this.password, (err, result) => {
    if (err) return func(err);
    func(null, result);
  });
};

module.exports = mongoose.model('User', userSchema);
