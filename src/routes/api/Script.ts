import { Router } from 'express'
import { OK } from 'http-status-codes'
import scriptService from '@services/ScriptService'

const router = Router()

router.get('/:id/latest', async (req, res, next) => {
  try {
    const { id: scriptId } = req.params

    const script = await scriptService.getLatestScript(scriptId)

    return res.status(OK).json(script)
  } catch (err) {
    next(err)
  }
})

export default router
