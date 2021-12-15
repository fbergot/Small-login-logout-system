const RegisterAndLogin = require('./registerAndLogin/registerAndLogin');
const passport = require("passport");

module.exports = {
  register: {
    _get: RegisterAndLogin._getInstance().register_get,
    _post: RegisterAndLogin._getInstance().register_post,
  },

  login: {
    _get: RegisterAndLogin._getInstance().login_get,
    _post: passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    }),
  },

  logout: {
    _delete: RegisterAndLogin._getInstance().logout_delete,
  },
};