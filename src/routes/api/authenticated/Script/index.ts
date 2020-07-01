import { Router } from 'express'
import { OK, NOT_FOUND } from 'http-status-codes'
import { Boolean, Null, Number, Record, String, Undefined, Unknown } from 'runtypes'
import scriptService from '@services/ScriptService'
import ScriptResults from './ScriptResults'
import getIsSuperAdmin from '../getIsSuperAdmin'

const router = Router()

router.use('/:id', async (req, res, next) => {
  try {
    // Check the script ownership
    const { id } = req.params
    const success = await scriptService.checkOwnership(id, req.user!.id)
    if (success || getIsSuperAdmin(req.user!)) {
      return next()
    }
    return res.status(NOT_FOUND).json()
  } catch (err) {
    next(err)
  }
})

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

router.post('/:id/publish', async (req, res, next) => {
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

const CloneScriptBody = Record({
  title: String.Or(Undefined)
})
router.post('/:id/clone', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params
    const { title } = CloneScriptBody.check(req.body)

    const newScript = await scriptService.cloneScript(scriptId, req.user!.id, title)

    return res.status(OK).json(newScript)
  } catch (err) {
    next(err)
  }
})

router.use(ScriptResults)

export default router
