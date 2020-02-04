
import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { BAD_REQUEST, OK } from 'http-status-codes';
import ScriptVersion from 'src/models/ScriptVersion';
import scriptService from 'src/services/ScriptService';

import { logger } from '@shared';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const adminId = req.query.adminId

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
    const { id } = req.params as ParamsDictionary

    const script = await scriptService.getScript(id)

    return res.status(OK).json(script)
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


export default router
