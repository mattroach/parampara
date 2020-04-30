import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String } from 'runtypes'
import adminService from '../services/AdminService'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const { id: adminId } = req.params

    const result = await adminService.getById(adminId)

    // @ts-ignore: hide password
    result.password = undefined

    return res.status(OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/login', async (req, res, next) => {
  try {
    const { id: adminId } = req.params
    const password: string | undefined = req.body.password

    const results = await adminService.login(adminId, password)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
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
