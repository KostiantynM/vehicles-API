import { Request, Response, NextFunction, Application } from 'express';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import {isCelebrateError} from 'celebrate';

import { logger } from '../../lib';
import { Context } from '../Types';

declare global {
  namespace Express {
    interface Request {
      ctx: Context,
      requestId: string | null
    }
  }
  interface Error {
    joi?: Error,
    status?: number
  }
}

const injectCtx = (req: Request, res: Response, next: NextFunction): void => {
  req.ctx = {
    requestId: req.requestId || uuid(),
    logger
  };
  next();
};

const injectErrorsHandler = (app: Application) => (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();

  if (isCelebrateError(err)) {
    return next(err);
  }

  if (app.get('env') !== 'development') {
    throw err;
  }

  const { status, stack: errorMetadata, message } = err;
  const {
    requestId,
    ctx: {
      logger: log
    },
  } = req;
  const statusCode = status || 500;

  const level = (statusCode >= 500) ? 'error'
    : (statusCode >= 400) ? 'warn' : 'info';
  log[level]( message, {
    requestId,
    statusCode,
    errorMetadata:
      ((level === 'error') ||
        ((level === 'warn') && (!_.includes([401, 404], statusCode)))
      ) ? errorMetadata : null,
  });

  res.status(statusCode).send(message);
};

export {
  injectCtx,
  injectErrorsHandler
};