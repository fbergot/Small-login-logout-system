const passport = require("passport");
const Connect = require('../../models/database/Connect');
const UserModel = require('../../models/UserModel');
const MakeBcrypt = require("../../models/bcrypt/MakeBcrypt");
const usermodelInstance = new UserModel(Connect._getInstance());
const makeBcryptInstance = MakeBcrypt._getInstance();
const VerifData = require('../../models/utilitary/VerifData');
const messageUser = require('../../models/utilitary/messageUser');




module.exports = class RegisterAndLogin {

    static _instance = null;
    
     static _getInstance() {
        if (this._instance === null) {
            this._instance = new RegisterAndLogin();
            return this._instance;
        }
        return this._instance;
    }
    


    login_get(req, res, next) {
        return res.render('login.ejs');
    }

    register_get(req, res, next) {
        return res.render("register.ejs", { message: null });
    }

    register_post(req, res, next) {
        ( async () => {
            const varUser = {
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
             };

             // vérif name
          if (!VerifData.validateName(varUser.name)) {

               return res.status(400).render("register.ejs", {
                    messageNotValidName:
                        messageUser.validateMessage.messageName.nameLength,
               });
             }

             // vérif email
             if (!VerifData.validateEmail(varUser.email)) {
               return res.status(400).render("register.ejs", {
                    messageNotValidEmail:
                        messageUser.validateMessage.messageEmail.notValid,
               });
            }
            
             // verif password
             if (!VerifData.validatePassword(varUser.password)) {
               return res.status(400).render("register.ejs", {
                    messageNotValidPassword:
                        messageUser.validateMessage.messagePassword.notValid,
               });
             }

             try {
               const instanceMakeBcrypt = MakeBcrypt._getInstance();
               const hash = await instanceMakeBcrypt.genSaltAndHash(
                    varUser.password,
                    Number.parseInt(process.env.SALTROUND)
               );
               const result = await usermodelInstance.createUser(
                    null,
                    varUser.name,
                    varUser.email,
                    hash
               );

               if (!result) {
                    return res.status(409).render("register.ejs", {
                        emailUserExist: messageUser.validateMessage.emailExist,
                 });
               }
               return res.status(201).render("login.ejs", {
                    success: messageUser.validateMessage.success.register,
               });
             } catch (err) {
                  console.error(err.message);
                  return res.status(500).render("register.ejs", {
                     error: messageUser.errors.internalErrorServer,
               });
             }
         })()        
    }

    logout_delete(req, res, next) {
        req.logOut();
        return res.redirect("/login");
    }
}