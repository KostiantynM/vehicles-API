import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import {errors} from 'celebrate';
import { injectCtx, injectErrorsHandler } from './common/middlewares';
import api from './api';

const app = express();

// inject requestId and logger
app.use(injectCtx);
app.use(bodyParser.json({
  limit: '50mb',
  verify(req: any, res, buf, encoding) {
    req.rawBody = buf;
  }
}));

// register api v1 routes
api.v1(app);

// errors handler
app.use(injectErrorsHandler(app));
app.use(errors());

export {app};