const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function initilize(passport, getUserByEmail,messageNotUserWithEmail, getUserById, messageNotUserWithId) {

    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

        try {
            // on va chercher un user grace à son email :
            var user = await getUserByEmail(email);
            if (!user) {
                return done(null, false, messageNotUserWithEmail);
            }
            
        } catch (err) {
            console.error(err.message);
        }

        try {
            // note : on recoit les données de manière tordu dans user ! (faire que les données soient envoyées de meilleur facon dans la promesse)
            // console.log(user[0][0].password);
            if (await bcrypt.compare(password, user[0][0].password)) {
              return done(null, user[0][0]);
            }
            return done(null, false, messageNotUserWithId);
        } catch(err) {
            return done(err);
        }
    }));
    // le serialize permet d'introduire dans le cookie de session d'id de l'utilisateur(ou l'utilisateur entier selon ce que l'on souhaite)
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //  le deserialize permet de retrouver l'utilisateur avec son id présent dans le cookie
    passport.deserializeUser(async (id, done) => {
        done(null, await getUserById(id));
     });
}