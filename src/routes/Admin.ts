import { logger } from '@shared'
import { Request, Response, Router } from 'express'
import { BAD_REQUEST, OK } from 'http-status-codes'
import { ParamsDictionary } from 'express-serve-static-core'
import adminService from '../services/AdminService'

const router = Router()

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary

    const adminResult = await adminService.getById(id)

    // @ts-ignore: hide password
    adminResult.password = undefined

    return res.status(OK).json(adminResult)
  } catch (err) {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
      error: err.message
    })
  }
})

export default router
