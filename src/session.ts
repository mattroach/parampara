import session from 'express-session'

// config express-session
const sess: session.SessionOptions = {
  secret: '21459f22-4ac7-4ec1-bcee-4176e97d5dc5',
  cookie: {},
  resave: false,
  saveUninitialized: true
}

if (process.env.NODE_ENV === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie!.secure = true

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

const configuredSession = session(sess)
export default configuredSession
