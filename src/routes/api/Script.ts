import { Router } from 'express'
import { OK } from 'http-status-codes'
import { Boolean, Null, Number, Record, String, Undefined, Unknown } from 'runtypes'
import scriptService from '../../services/ScriptService'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const scripts = await scriptService.getScripts(req.user!.id)

    return res.status(OK).json(scripts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const script = await scriptService.getDraftScript(scriptId)

    return res.status(OK).json(script)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/latest', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const script = await scriptService.getLatestScript(scriptId)

    return res.status(OK).json(script)
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
  title: String
})

router.post('/', async (req, res, next) => {
  try {
    const { title } = CreateScriptBody.check(req.body)

    const script = await scriptService.createScript(req.user!.id, { title })

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

    console.log('update', scriptId, script)

    await scriptService.updateScript(scriptId, script)

    return res.status(OK).json({})
  } catch (err) {
    next(err)
  }
})

export default router
