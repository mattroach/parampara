import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { Record, String } from 'runtypes'
import Admin from '../models/Admin'
import adminService from '../services/AdminService'

const router = Router()

const checkPassword = (password: string) => {
  // Really shitty auth. The whole admin backend needs to be moved to an external service, or at least decouled from the main
  // react bundle and have proper session auth on the backend - this is super temporary.
  if (password !== 'f43gdo8jgo3') throw Error('Password incorrect')
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
      error: err.message
    })
  }
})

router.post('/createUser', async (req: Request, res: Response) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const email: string = req.body.email

    const admin = await adminService.createAdmin(email)

    return res.status(OK).json(admin)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

const UpdatePasswordReq = Record({
  email: String,
  newPassword: String
})

router.post('/updatePassword', async (req: Request, res: Response) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const { email, newPassword } = UpdatePasswordReq.check(req.body)

    const admin = await adminService.updatePassword(email, newPassword)

    return res.status(OK).json(admin)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

export default router
