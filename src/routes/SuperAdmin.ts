import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String, Undefined } from 'runtypes'
import Admin from '../models/Admin'
import adminService from '../services/AdminService'
import scriptService from '../services/ScriptService'

const router = Router()

const checkPassword = (password: string) => {
  // Really shitty auth. The whole admin backend needs to be moved to an external service, or at least decouled from the main
  // react bundle and have proper session auth on the backend - this is super temporary.
  if (password !== 'f43gdo8jgo3') throw Error('Password incorrect')
}

router.get('/getUsers', async (req, res, next) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const admins = await Admin.query()

    return res.status(OK).json(admins)
  } catch (err) {
    next(err)
  }
})

router.post('/createUser', async (req, res, next) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const email: string = req.body.email

    const admin = await adminService.createAdmin(email)

    return res.status(OK).json(admin)
  } catch (err) {
    next(err)
  }
})

const UpdatePasswordReq = Record({
  email: String,
  newPassword: String
})

router.post('/updatePassword', async (req, res, next) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const { email, newPassword } = UpdatePasswordReq.check(req.body)

    const admin = await adminService.updatePassword(email, newPassword)

    return res.status(OK).json(admin)
  } catch (err) {
    next(err)
  }
})

const CloneScriptReq = Record({
  scriptId: String,
  destinationAdminId: String,
  newTitle: String.Or(Undefined)
})
router.post('/cloneScript', async (req, res, next) => {
  try {
    const { password } = req.query
    checkPassword(password)

    const { scriptId, destinationAdminId, newTitle } = CloneScriptReq.check(req.body)

    await scriptService.cloneScript(scriptId, destinationAdminId, newTitle)

    return res.status(OK).json('Cloned')
  } catch (err) {
    next(err)
  }
})

export default router
