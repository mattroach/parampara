import cookieParser from 'cookie-parser'
import express, { Request, Response } from 'express'
import fs from 'fs'
import Knex from 'knex'
import logger from 'morgan'
import { knexSnakeCaseMappers, Model } from 'objection'
import path from 'path'
import getScriptOG from './getScriptOG'
import BaseRouter from './routes'

// Init db stuff
const knex = Knex({
  debug: true,
  client: 'pg',
  connection: {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME
  },
  ...knexSnakeCaseMappers()
})

Model.knex(knex)

// Init express
const app = express()

if (process.env.NODE_ENV === 'production') {
  // Redirect to HTTPS
  app.use((req, res, next) => {
    // Insecure request?
    if (req.get('x-forwarded-proto') == 'http') {
      // Redirect to https://
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
app.use('/api', BaseRouter)

// For dist builds ONLY - not useful for local dev runtime
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('/s/:scriptId', (req: Request, res: Response) => {
  const { scriptId } = req.params

  fs.readFile(path.resolve(publicDir, 'index.html'), 'utf8', async (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    const headers = await getScriptOG(scriptId)
    console.log('headers', headers)
    return res.send(data.replace('</head>', headers + '</head>'))
  })
})

app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: publicDir })
})

// Export express instance
export default app
