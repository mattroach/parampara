
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import Script from 'src/models/Script';
import ScriptVersion from 'src/models/ScriptVersion';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const adminId = req.query.adminId;

    const scripts = Script.query()
      .where('adminId', adminId)
      .where('version', '!=', ScriptVersion.DRAFT_VERSION)
      .orderBy('created')

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

    const scriptsResult = await ScriptVersion.query()
      .where('scriptId', id)
      .where('version', '!=', ScriptVersion.DRAFT_VERSION)
      .orderBy('version')
      .limit(1)
    const scriptResult = scriptsResult[0]

    // const script = {
    //   versionId: scriptResult.$id,
    //   scriptId: scriptResult.scriptId
    // }
    
    return res.status(OK).json(scriptResult);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default router;
