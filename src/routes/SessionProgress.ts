
import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { ParamsDictionary } from 'express-serve-static-core'
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
  items: any[]
}

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary

    const updateRequest: UpdateProgressReq = req.body

    if (!id)
      throw new Error('No scriptId provided')

    await sessionProgressService.updateSessionProgress(id, updateRequest.currentItemId, updateRequest.items)

    return res.status(OK).json({})
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message,
    })
  }
})

export default router
