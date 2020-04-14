import { Router } from 'express'
import { OK } from 'http-status-codes'
import adminService from '../services/AdminService'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const adminResult = await adminService.getById(id)

    // @ts-ignore: hide password
    adminResult.password = undefined

    return res.status(OK).json(adminResult)
  } catch (err) {
    next(err)
  }
})

export default router
