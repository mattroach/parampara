import { Router } from 'express'
import { OK } from 'http-status-codes'
import sessionProgressService from '../services/SessionProgressService'

const router = Router()

type StartOrLoadProgressReq = {
  email?: string
  scriptId: string
  referrerCode?: string
}

/**
 * Returns an existing session for the corresponding scriptId and email, or otherwise creates a
 * new session and returns that. If no email is passed in, it will always return a new anon session.
 */
router.post('/', async (req, res, next) => {
  try {
    const request: StartOrLoadProgressReq = req.body
    const { scriptId, email, referrerCode } = request

    if (!scriptId) throw new Error('No scriptId provided')

    const progress = await sessionProgressService.getOrCreateSessionProgress(scriptId, {
      email,
      referrerCode
    })

    return res.status(OK).json(progress)
  } catch (err) {
    next(err)
  }
})

type UpdateProgressReq = {
  currentItemId: number
  items: any[]
  durationSec: number
}

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const { currentItemId, items, durationSec } = req.body as UpdateProgressReq

    if (!id) throw new Error('No scriptId provided')

    if (!currentItemId || !items || !durationSec) throw new Error('Params missing')

    await sessionProgressService.updateSessionProgress(id, {
      currentItemId,
      items,
      durationSec
    })

    return res.status(OK).json({})
  } catch (err) {
    next(err)
  }
})

export default router
