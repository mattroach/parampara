import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes'
import { Boolean, Record, String, Number, Undefined, Unknown, Null } from 'runtypes'
import scriptService, { ScriptVersionCode } from '../services/ScriptService'
import sessionResponseService from '../services/SessionResponseService'
import adminService from '../services/AdminService'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { adminId } = req.query

    if (!adminId) throw Error('Must pass in a adminId')

    const scripts = await scriptService.getScripts(adminId)

    return res.status(OK).json(scripts)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary
    const { version }: { version: ScriptVersionCode } = req.query
    if (!(version in ScriptVersionCode)) throw Error('Bad version')

    const script = await scriptService.getScriptWithVersion(scriptId, version)

    // @ts-ignore: tmp until adminIds do not need to be secret
    script.adminId = undefined

    return res.status(OK).json(script)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary

    await scriptService.deleteScript(scriptId)

    return res.status(OK).json({})
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

router.get('/:id/results', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary
    const { password } = req.query

    const script = await scriptService.getScript(scriptId)
    if (!(await adminService.authenticatePassword(script.adminId, password)))
      return res.status(UNAUTHORIZED).json('Authentication required')

    const results = await sessionResponseService.getSessionsWithResponses(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

const CreateScriptBody = Record({
  adminId: String,
  title: String
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { adminId, title } = CreateScriptBody.check(req.body)

    if (!adminId) throw Error('Must pass in a adminId')

    const script = await scriptService.createScript(adminId, { title })

    return res.status(OK).json(script)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

router.post('/publish/:id', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary

    await scriptService.publishScript(scriptId)

    return res.status(OK).json({})
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

const UpdateScriptBody = Record({
  title: String.Or(Undefined),
  allowAnon: Boolean.Or(Undefined),
  reportingEmail: String.Or(Undefined),
  metaImgUrl: String.Or(Null).Or(Undefined),
  metaImgWidth: Number.Or(Null).Or(Undefined),
  metaImgHeight: Number.Or(Null).Or(Undefined),
  metaTitle: String.Or(Null).Or(Undefined),
  metaDescription: String.Or(Null).Or(Undefined),
  version: Record({ items: Unknown }).Or(Undefined)
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary

    const script = UpdateScriptBody.check(req.body)

    await scriptService.updateScript(scriptId, script)

    return res.status(OK).json({})
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

export default router
