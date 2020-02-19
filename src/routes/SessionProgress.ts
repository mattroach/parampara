
import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { ParamsDictionary } from 'express-serve-static-core'
import sessionProgressService from '../services/SessionProgressService'

const router = Router()

type StartOrLoadProgressReq = {
  email?: string
  scriptId: string
}

/**
 * Returns an existing session for the corresponding scriptId and email, or otherwise creates a
 * new session and returns that. If no email is passed in, it will always return a new anon session.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const request: StartOrLoadProgressReq = req.body
    const { scriptId, email } = request

    if (!scriptId)
      throw new Error('No scriptId provided')

    const progress = await sessionProgressService.getOrCreateSessionProgress(scriptId, email)

    return res.status(OK).json(progress)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

type UpdateProgressReq = {
  currentItemId: number
  scriptVersionId: string
  items: any[]
}

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary

    const reqParams: UpdateProgressReq = req.body

    if (!id)
      throw new Error('No scriptId provided')

    if (!reqParams.currentItemId || !reqParams.scriptVersionId || !reqParams.items)
      throw new Error('Params missing')

    await sessionProgressService.updateSessionProgress(id, reqParams.scriptVersionId, reqParams.currentItemId, reqParams.items)

    return res.status(OK).json({})
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

export default router
