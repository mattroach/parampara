import { Router } from 'express'
import { OK } from 'http-status-codes'
import adminService from '../services/AdminService'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const { id: adminId } = req.params

    const result = await adminService.getById(adminId)

    // @ts-ignore: hide password
    result.password = undefined

    return res.status(OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/login', async (req, res, next) => {
  try {
    const { id: adminId } = req.params
    const password: string | undefined = req.body.password

    const results = await adminService.login(adminId, password)

    return res.status(OK).json(results)
  } catch (err) {
    next(err)
  }
})

export default router
