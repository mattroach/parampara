
import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import sessionProgressService from 'src/services/SessionProgressService'

const router = Router()

type StartOrLoadProgressReq = {
  email?: string
  scriptId: string
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const request: StartOrLoadProgressReq = req.body
    const { scriptId, email } = request

    const progress = sessionProgressService.getOrCreateSessionProgress(scriptId, email)

    return res.status(OK).json(progress)

  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

export default router
