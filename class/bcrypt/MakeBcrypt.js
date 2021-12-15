const bcrypt = require("bcrypt");

module.exports = class MakeBcrypt {
  static instance = null;

  constructor(bcrypt) {
    this.bcrypt = bcrypt;
  }

  static _getInstance() {
    if (!this.instance) {
      this.instance = new MakeBcrypt(bcrypt);
      return this.instance;
    }
    return this.instance;
  }

    genSaltAndHash(plainTextPassword, saltRound) {
        return new Promise((resolve, reject) => {
            this.bcrypt.hash(plainTextPassword, saltRound, (err, hash) => {
                err ? reject(err) : resolve(hash);
            });      
      })
  }
};