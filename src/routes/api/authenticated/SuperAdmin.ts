import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Record, String, Undefined, Union, Literal } from 'runtypes'
import { UNAUTHORIZED } from 'http-status-codes'
import Admin from '@models/Admin'
import adminService from '@services/adminService'
import scriptService from '@services/ScriptService'
import getIsSuperAdmin from './getIsSuperAdmin'

const API_PASSWORD = process.env.SUPER_ADMIN_PASS

const router = Router()

router.use('/', async (req, res, next) => {
  try {
    // Login auth - allow Jonah only for now
    if (req.user && getIsSuperAdmin(req.user)) return next()

    // Basic auth
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':')

    if (!API_PASSWORD) {
      return next('API_PASSWORD not set')
    }

    if (login === 'admin' && password === API_PASSWORD) {
      return next()
    }

    res.status(UNAUTHORIZED).send('Authentication required.')
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
