const express = require('express');
const AppController = require("../controller/viewAppController.js/AppViewController");
const userController = require('../controller/users_controller');
const AuthMiddleWare = require("../middleware/AuthMiddleware");

exports.router = (function (router) {
    const exRouter = router();

    exRouter
      .route("/")
      .get(AuthMiddleWare.checkAuthenticate, AppController.appHome);

    exRouter
        .route("/login")
        .get(AuthMiddleWare.checkNotAuthenticate, userController.login._get);
      
    exRouter
        .route("/login")
        .post(userController.login._post);

    exRouter
        .route("/register")
        .get(AuthMiddleWare.checkNotAuthenticate, userController.register._get);
      
    exRouter
        .route("/register")
        .post(userController.register._post);

    exRouter
        .route("/logout")
        .delete(userController.logout._delete);

    return exRouter;
})(express.Router);