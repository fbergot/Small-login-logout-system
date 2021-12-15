const AuthMiddleware = require("../../middleware/AuthMiddleware");

module.exports = class AppViewController {
    static appHome(req, res, next) {
        res.render("home.ejs", {});
    }
}