import { logger } from './Logger';
import { v4 as uuidv4 } from 'uuid';

export const paramMissingError = 'One or more of the required parameters was missing.';

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const uuid = () => {
  return uuidv4();
};
