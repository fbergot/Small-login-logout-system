require('dotenv').config({ path: "./config/.env" });

const Connect = require('./class/database/Connect');
const UserModel = require('./class/UserModel');
const usermodel = new UserModel(Connect._getInstance());
const router = require('./router/router').router;
const express = require("express");
const app = express();
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOveride = require('method-override');
const messageForUser = require('./class/utilitary/messageUser');

// init passport
initializePassport(passport, email => {
    return usermodel.getUserByEmail(email, true)
    
}, messageForUser.validateMessage.messageEmail.message, id => {
    return usermodel.getUserById(id);

}, messageForUser.validateMessage.messagePassword.notValid);


app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOveride('_method'));
app.use("/", router);



app.listen(process.env.PORT, () => {
    console.log(`Server ready on ${process.env.PORT}`);
});





