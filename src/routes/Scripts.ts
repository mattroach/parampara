
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Script from 'src/models/Script';

// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const scripts = [{ id: 1 }];
    return res.status(OK).json({ scripts });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary;

    const script = await Script.query().findById(id);

    return res.status(OK).json(script);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
