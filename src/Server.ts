import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'
import { Model } from 'objection'
import path from 'path'
import getScriptOG from './getScriptOG'
import APIRouter from './routes/api'
import AuthRouter from './routes/auth'
import knex from './knex'
import createIndexProvider from './createIndexProvider'
import session from './session'
import passport from './passport'

Model.knex(knex)

// Init express
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // Needed for cookies to work

  // If HTTP, redirect to HTTPS
  app.use((req, res, next) => {
    if (req.get('x-forwarded-proto') == 'http') {
      return res.redirect('https://' + req.get('host') + req.url)
    }

    next()
  })
}

// Add middleware/settings/routes to express.
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', AuthRouter)
app.use('/api', APIRouter)

// When running locally, the react server will proxy to the backend. Therefore the APIs below are not
// used when developing locally.

app.get('/index.html', (req, res) => {
  return res.redirect('/')
})

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

const indexProvider = createIndexProvider(publicDir)

// Inject special OG metadata for the script player
app.get('/s/:scriptId', async (req, res, next) => {
  try {
    const { scriptId } = req.params
    const headers = await getScriptOG(scriptId)

    res.send(await indexProvider.getWith(headers))
  } catch (err) {
    next(err)
  }
})

app.get('*', async (req, res, next) => {
  try {
    res.send(await indexProvider.get())
  } catch (err) {
    next(err)
  }
})

// Export express instance
export default app
