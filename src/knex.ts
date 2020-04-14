import Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'

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

export default knex
