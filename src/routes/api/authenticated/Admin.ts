import { Router } from 'express'
import { OK } from 'http-status-codes'

const router = Router()

router.get('/current', (req, res) => {
  return res.status(OK).json(req.user!)
})

export default router
