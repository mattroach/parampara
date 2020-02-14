import cookieParser from 'cookie-parser'
import express from 'express'
import { Request, Response } from 'express'
import logger from 'morgan'
import path from 'path'
import BaseRouter from './routes'

import Knex from 'knex'
import { Model, knexSnakeCaseMappers } from 'objection'

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

// Add middleware/settings/routes to express.
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', BaseRouter)

const frontendDir = path.join(__dirname, '../frontend/build')
app.use(express.static(frontendDir))
app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: frontendDir })
})

// Export express instance
export default app
