import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String, Undefined, Union, Literal } from 'runtypes'
import Admin from '../../models/Admin'
import adminService from '../../services/adminService'
import scriptService from '../../services/ScriptService'
import { isValidEmail } from './Admin'

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

const CreateUserBody = Record({
  email: String.withConstraint(isValidEmail)
})

// Deprecated - use API in Admin route
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
  tier: Union(Literal('free'), Literal('pro'), Literal('pro2'))
})

router.put('/user/:id/subscription', async (req, res, next) => {
  try {
    const { id: userId } = req.params
    const { tier } = UpdateSubscriptionBody.check(req.body)

    await adminService.setSubscription(userId, tier)

    return res.status(OK).json('ok')
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
