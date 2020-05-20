import session from 'express-session'
import knex from './knex'
import sessionKnex from 'connect-session-knex'

const KnexSessionStore = sessionKnex(session)

const store = new KnexSessionStore({
  knex: knex,
  tablename: 'session',
  createtable: true,
  clearInterval: 1000 * 60 * 5 //in ms
})

const sessionConfig: session.SessionOptions = {
  secret: '21459f22-4ac7-4ec1-bcee-4176e97d5dc5',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store
}

if (process.env.NODE_ENV === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sessionConfig.cookie!.secure = true

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

const configuredSession = session(sessionConfig)
export default configuredSession
