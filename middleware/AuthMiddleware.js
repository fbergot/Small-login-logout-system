module.exports = class AuthMiddleware {

    static checkAuthenticate(req, res, next) {
        if (req.isAuthenticated()) {
           return next();
        }
        return res.redirect('/login')
    }

    static checkNotAuthenticate(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    }
}