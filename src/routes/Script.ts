import { Router } from 'express'
import { NOT_FOUND, OK } from 'http-status-codes'
import { Boolean, Null, Number, Record, String, Undefined, Unknown } from 'runtypes'
import Script from 'src/models/Script'
import scriptService, { ScriptVersionCode } from '../services/ScriptService'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { adminId } = req.query

    if (!adminId) throw Error('Must pass in a adminId')

    const scripts = await scriptService.getScripts(adminId)

    return res.status(OK).json(scripts)
  } catch (err) {
    next(err)
  }
})

type GetScriptResponse = Script & { isPublished: boolean }
router.get('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { version }: { version: ScriptVersionCode } = req.query
    if (!(version in ScriptVersionCode)) throw Error('Bad version')

    const script = await scriptService.getScriptWithVersion(scriptId, version)

    if (!script) {
      return res.status(NOT_FOUND).json('Script not found')
    }

    const response = script as GetScriptResponse
    // @ts-ignore: Is secret for now
    response.adminId = undefined

    // TODO fix this typeing..
    const countResult = (await script
      .$relatedQuery('version')
      .count()
      .as('count')) as any
    response.isPublished = countResult.count > 1

    return res.status(OK).json(response)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    await scriptService.deleteScript(scriptId)

    return res.status(OK).json({})
  } catch (err) {
    next(err)
  }
})

const CreateScriptBody = Record({
  adminId: String,
  title: String
})

router.post('/', async (req, res, next) => {
  try {
    const { adminId, title } = CreateScriptBody.check(req.body)

    if (!adminId) throw Error('Must pass in a adminId')

    const script = await scriptService.createScript(adminId, { title })

    return res.status(OK).json(script)
  } catch (err) {
    next(err)
  }
})

router.post('/publish/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    await scriptService.publishScript(scriptId)

    return res.status(OK).json({})
  } catch (err) {
    next(err)
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

router.put('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const script = UpdateScriptBody.check(req.body)

    await scriptService.updateScript(scriptId, script)

    return res.status(OK).json({})
  } catch (err) {
    next(err)
  }
})

export default router
