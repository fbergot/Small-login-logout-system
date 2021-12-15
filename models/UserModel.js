module.exports = class UserModel {

    constructor(connectionInstance) {
        this.connection = connectionInstance;
    }

    /**
     * add one line in users table of Database
     * 
     * @param {null|String} url_img
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * 
     * @returns {Promise}
     */
    createUser(url_img, name, email, password) {
        return new Promise((resolve, reject) => {
            this.getUserByEmail(email, null)
                .then((true_or_false) => {
                    if (true_or_false) {
                        try {
                            this.connection.makePrepareQuery("INSERT INTO users SET url_img=? , name=? , email=? , password=?",
                                [url_img, name, email, password], (results, fields) => {
                                    resolve([results.insertId, fields]);
                            });
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        resolve(false);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * Get a user in Database by his email
     * 
     * @param {String} email
     * @returns {Promise}
     */
    getUserByEmail(email, sort) {
        return new Promise((resolve, reject) => {
            try {
                this.connection.makePrepareQuery("SELECT * FROM users WHERE email=?", [email], (result, fields) => {
                    if (sort !== null) {
                        result.length !== 0 ? resolve([result, fields]) : resolve(null);
                        console.log(result);
                    } else {
                        result.length !== 0 ? resolve(false) : resolve(true); 
                    }
                });                   
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Get a user in Database by his id
     * 
     * @param {Number} id
     * @returns {Promise}
     */
    getUserById(id) {
        return new Promise((resolve, reject) => {
            try {
                this.connection.makePrepareQuery("SELECT * FROM users WHERE id=?", [id], (result, fields) => {
                    result.length !== 0 ? resolve(result[0]) : resolve(null);
                });
            } catch (err) {
                reject(err);
            }
        });
    } 
}