const mysql = require('mysql');
const pathDotConf = require("path").join(__dirname, "../../config/.env");
require("dotenv").config({ path: pathDotConf });

module.exports = class Connect {
  /**
   * For store the uniq instance(singleton)
   *
   * @static
   * @type {null|Connect}
   */
  static _instance = null;

  /**
     *Creates an instance of Connect.
    
     * @param {String} dbName
     * @param {String} dbUser
     * @param {String} dbPassword
     * @param {String} dbHost
     * @param {Number} dbPort
     * @param {module} mysql
     */
  constructor(dbName, dbUser, dbPassword, dbHost, dbPort, mysql) {
    // params :
    this.dbName = dbName;
    this.dbUser = dbUser;
    this.dbPassword = dbPassword;
    this.dbHost = dbHost;
    this.dbPort = dbPort;
    //injection mysql :
    this.mysql = mysql;
  }

  /**
   * Allows of get one uniq instance of Connect (Singleton)
   *
   * @static
   * @returns {InstanceType} instance of Connect
   */
  static _getInstance() {
    if (this._instance === null) {
      this._instance = new Connect(
        process.env.DBNAME,
        process.env.DBUSER,
        process.env.DBPASSWORD,
        process.env.DBHOST,
        process.env.DBPORT,
        mysql
      );
    }
    return this._instance;
  }

  /**
   * Create database-connection
   *
   * @returns {sqlConnection}
   */
  connect() {
    return this.mysql.createConnection({
      host: this.dbHost,
      port: this.dbPort,
      user: this.dbUser,
      password: this.dbPassword,
      database: this.dbName,
    });
  }

  /**
   * Make query
   *
   * @param {String} queryString
   * @param {CallableFunction} func
   */
  makeQuery(queryString, func) {
    this.connect().query(queryString, (error, results, fields) => {
      if (error) throw new Error(error.message);
      func(results, fields);
    });
    this.connect().end();
  }

  /**
   * Make a prepared query
   *
   * @param {String} queryString
   * @param {Array<String>} arrArguments
   * @param {CallableFunction} func
   */
    makePrepareQuery(queryString, arrArguments, func) {
        this.connect().query(
        queryString,
        arrArguments,
        (error, results, fields) => {
            if (error) throw new Error(error.message);
            return func(results, fields);
        }
        );
        this.connect().end();
    }
};