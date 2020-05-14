import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String } from 'runtypes'
import adminService from '../../services/adminService'

const router = Router()

router.get('/current', (req, res) => {
  return res.status(OK).json(req.user!)
})

export function isValidEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const CreateUserBody = Record({
  email: String.withConstraint(isValidEmail)
})

router.post('/', async (req, res, next) => {
  try {
    const { email } = CreateUserBody.check(req.body)

    const admin = await adminService.createAdmin(email)

    return res.status(OK).json(admin)
  } catch (err) {
    next(err)
  }
})

export default router
