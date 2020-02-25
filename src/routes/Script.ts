
import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { Boolean, Record, String, Undefined, Unknown } from 'runtypes'
import scriptService, { ScriptVersionCode } from '../services/ScriptService'
import sessionResponseService from '../services/SessionResponseService'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { adminId } = req.query

    if (!adminId)
      throw Error('Must pass in a adminId')

    const scripts = await scriptService.getScripts(adminId)

    return res.status(OK).json(scripts)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary
    const { version }: { version: ScriptVersionCode } = req.query
    if (!(version in ScriptVersionCode))
      throw Error('Bad version')

    const script = await scriptService.getScript(scriptId, version)

    return res.status(OK).json(script)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

router.get('/:id/results', async (req: Request, res: Response) => {
  try {
    const { id: scriptId } = req.params as ParamsDictionary

    const results = await sessionResponseService.getSessionsWithResponses(scriptId)

    return res.status(OK).json(results)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const adminId: string = req.body.adminId

    if (!adminId)
      throw Error('Must pass in a adminId')

    const script = await scriptService.createScript(adminId)

    return res.status(OK).json(script)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
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
      error: err.message,
    })
  }
})

const UpdateScriptBody = Record({
  title: String.Or(Undefined),
  allowAnon: Boolean.Or(Undefined),
  reportingEmail: String.Or(Undefined),
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
      error: err.message,
    })
  }
})


export default router
