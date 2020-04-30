import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String, Undefined, Boolean } from 'runtypes'
import Admin from '../models/Admin'
import adminService from '../services/AdminService'
import scriptService from '../services/ScriptService'

const PASSWORD = 'f43gdo8jgo3'

const router = Router()

router.use('/', async (req, res, next) => {
  try {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':')

    if (login === 'admin' && password === PASSWORD) {
      return next()
    }

    // Old fallback auth ===========
    const fallbackPassword = req.query.password
    if (fallbackPassword === PASSWORD) {
      return next()
    }
    // End old fallback auth =======

    res.status(401).send('Authentication required.')
  } catch (err) {
    next(err)
  }
})

router.get('/getUsers', async (req, res, next) => {
  try {
    const admins = await Admin.query().orderBy('created', 'desc')

    return res.status(OK).json(admins)
  } catch (err) {
    next(err)
  }
})

function isValidEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email.toLowerCase())
}

const CreateUserBody = Record({
  email: String.withConstraint(isValidEmail)
})

router.post('/createUser', async (req, res, next) => {
  try {
    const { email } = CreateUserBody.check(req.body)

    const admin = await adminService.createAdmin(email)

    return res.status(OK).json(admin)
  } catch (err) {
    next(err)
  }
})

const UpdateSubscriptionBody = Record({
  isPro: Boolean
})

router.put('/user/:id/subscription', async (req, res, next) => {
  try {
    const { id: userId } = req.params
    const { isPro } = UpdateSubscriptionBody.check(req.body)

    await adminService.setSubscription(userId, isPro)

    return res.status(OK).json('ok')
  } catch (err) {
    next(err)
  }
})

const UpdatePasswordBody = Record({
  email: String,
  newPassword: String
})

router.post('/updatePassword', async (req, res, next) => {
  try {
    const { email, newPassword } = UpdatePasswordBody.check(req.body)

    const admin = await adminService.updatePassword(email, newPassword)

    return res.status(OK).json(admin)
  } catch (err) {
    next(err)
  }
})

const CloneScriptBody = Record({
  scriptId: String,
  destinationAdminId: String,
  newTitle: String.Or(Undefined)
})
router.post('/cloneScript', async (req, res, next) => {
  try {
    const { scriptId, destinationAdminId, newTitle } = CloneScriptBody.check(req.body)

    await scriptService.cloneScript(scriptId, destinationAdminId, newTitle)

    return res.status(OK).json('Cloned')
  } catch (err) {
    next(err)
  }
})

export default router
