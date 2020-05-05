import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import logger from 'morgan'
import { Model } from 'objection'
import path from 'path'
import getScriptOG from './getScriptOG'
import APIRouter from './api'
import knex from './knex'

Model.knex(knex)

// Init express
const app = express()

if (process.env.NODE_ENV === 'production') {
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
app.use('/api', APIRouter)

// Redirect home page to getparampara.com
app.get('/', (req, res) => {
  return res.redirect('https://www.getparampara.com')
})

// For dist builds ONLY - not useful for local dev runtime
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

// Inject special OG metadata for the script player
app.get('/s/:scriptId', (req, res) => {
  const { scriptId } = req.params

  fs.readFile(path.resolve(publicDir, 'index.html'), 'utf8', async (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    const headers = await getScriptOG(scriptId)
    return res.send(data.replace('</head>', headers + '</head>'))
  })
})

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: publicDir })
})

// Export express instance
export default app
