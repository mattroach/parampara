
import { logger, uuid } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { ParamsDictionary } from 'express-serve-static-core'
import Admin from '../models/Admin'

const router = Router()

const checkPassword = (password: string) => {
  // Really shitty auth. The whole admin backend needs to be moved to an external service, or at least decouled from the main
  // react bundle and have proper session auth on the backend - this is super temporary.
  if (password !== 'f43gdo8jgo3')
    throw Error('Password incorrect')
}

router.get('/getUsers', async (req: Request, res: Response) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const admins = await Admin.query()

    return res.status(OK).json(admins)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

router.post('/createUser', async (req: Request, res: Response) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const email: string = req.body.email

    const admins = await Admin.query().insert({
      id: uuid(),
      email
    })

    return res.status(OK).json(admins)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})


export default router
