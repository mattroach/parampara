import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import adminServiceNew from './services/adminServiceNew'
import Admin from './models/Admin'

declare global {
  namespace Express {
    export interface User extends Admin {}
  }
}

const extractUserDetails = (user: Auth0Strategy.Profile) => ({
  auth0Id: user.id,
  email: user._json.email,
  displayName: user.displayName,
  pictureUrl: user._json.picture
})

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN!,
    clientID: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    callbackURL: process.env.AUTH0_CALLBACK_URL!
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user

    const userDetails = extractUserDetails(profile)
    adminServiceNew.createOrUpdateAdmin(userDetails).then(() => {
      return done(null, profile)
    })
  }
)

// You can use this section to keep a smaller payload
passport.serializeUser(function(user: Auth0Strategy.Profile, done) {
  done(null, user.id)
})

passport.deserializeUser(function(auth0Id: string, done) {
  adminServiceNew.getByAuth0Id(auth0Id).then(admin => {
    done(null, admin)
  })
})

passport.use(strategy)

export default passport
