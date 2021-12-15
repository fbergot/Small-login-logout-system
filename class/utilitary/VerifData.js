module.exports = class VerifData {

    static regexEmail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$", "gi");

    /**
     * For 6-15 chars and 1 or + number
     * @static
     */
    static regexPassword = new RegExp(
          `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,15}$`,
          "gi"
        );

    /**
     * For verif if email is valid or not
     * @static
     * @param {String} email
     * @returns {Boolean|null}
     * @memberof VerifData
     */
    static validateEmail(email) {
        if (this.regexEmail.test(email)) {
            return true;
        }
        return false;
    }

    /**
     * For verif password (6-15) chars gived in constructor and 1 * * or + number(s)
     * @static
     * @param {Strting} password
     * @returns {Boolean|null}
     * @memberof VerifData
     */
    static validatePassword(password) {
        if (this.regexPassword.test(password)) {
          return true;
        }
        return false;
    }

     /**
      * For verif length of name
      * @static
      * @param {String} name
      * @returns {Boolean|null}
      * @memberof VerifData
      */
    static validateName(name) {
        if (name.length >= 3 && name.length <= 15) {
          return true;
        }
        return false;
    }

    static detectCharDangerous(string) {
        if (~string.indexOf("<script>") ||
            !~string.indexOf("<") ||
            !~string.indexOf(">") ||
            !~string.indexOf(".php") ||
            !~string.indexOf(".js")) {
            
            return true;
        }
        return false;
    }
}