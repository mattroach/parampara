import { Router } from 'express'
import passport from '../passport'
import querystring from 'querystring'
import url from 'url'

const router = Router()

// Map from route to the auth0 login "mode"
const authRoutes = {
  login: 'login',
  signup: 'signup',
  resetPassword: 'reset'
}

// Perform the login, after login Auth0 will redirect to callback
Object.entries(authRoutes).forEach(([route, mode]) => {
  router.get(
    '/' + route,
    // @ts-ignore: added mode attribute
    passport.authenticate('auth0', {
      scope: 'openid email profile',
      mode
    }),
    function(req, res) {
      res.redirect('/')
    }
  )
})

// Perform the final stage of authentication and redirect to previously requested URL or the default URL
router.get('/authCallback', function(req, res, next) {
  passport.authenticate('auth0', function(err, user, info) {
    if (err) return next(err)

    if (!user) return res.redirect('/login')

    req.logIn(user, function(err) {
      if (err) return next(err)

      const { returnTo } = req.session!
      delete req.session!.returnTo
      res.redirect(returnTo || '/account')
    })
  })(req, res, next)
})

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout()

  const logoutURL = new url.URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)

  logoutURL.search = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: 'https://getparampara.com'
  })

  res.redirect(logoutURL.toString())
})

export default router
