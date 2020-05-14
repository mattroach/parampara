import { Router } from 'express'
import passport from '../passport'
import util from 'util'
import querystring from 'querystring'
import url from 'url'

const router = Router()

// Perform the login, after login Auth0 will redirect to callback
router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile'
  }),
  function(req, res) {
    res.redirect('/')
  }
)

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

  let returnTo = req.protocol + '://' + req.hostname
  const port = req.connection.localPort
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port
  }
  const logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  )
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  })
  logoutURL.search = searchString

  res.redirect(logoutURL.toString())
})

export default router
