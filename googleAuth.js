const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const User = require('./models/user.model');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id });
          console.log(user, 'app 42');

          if (user) {
            //If user present in our database.
            done(null, user);
            console.log(user, 'app 47');
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser);
            console.log(user, 'app 51');

            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
