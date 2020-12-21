import config from 'config';
import _ from 'lodash';

import {app} from './app';
import {connect} from './lib/db';
import {gracefulShutdown, logger} from './lib';
import {ErrorPayload} from './common/Types/ErrorPayload';
import {seeder} from './seeds';

process
  .on('unhandledRejection', (err) => {
  if (err instanceof Error === false) {
    logger.error('UnhandledRejection non error object', { error: err.toString(), });
    return;
  }

  const payload = _.pick(err, [
    'message',
    'stack',
    'request.path',
    'response.data',
    'response.status',
    'response.statusText',
    'ctx.requestId',
  ]) as ErrorPayload;

  logger.error(`unhandledRejection: ${payload.message} `, payload);
});

if (process.env.NODE_ENV !== 'development') {
  process.once('uncaughtException', (err) => {
    const payload = _.pick(err, [
      'message',
      'stack',
      'request.path',
      'response.data',
      'response.status',
      'response.statusText',
      'ctx.requestId',
    ]);
    logger.error(`uncaughtException: ${payload.message} `, payload);
    process.exit(1);
  });
}

const init = async () => {
  try {
    const PORT = config.get('PORT') as number;
    const HOST = config.get('HOST') as string;
    logger.info(`init db connection`);

    await connect({logger, requestId: ''});
    logger.info('DB connected');
    await seeder();

    const server = app.listen(PORT, HOST, () => {
      logger.info(`Server listening on: http://${HOST}:${PORT}`);
    });
  } catch (err) {
    logger.error('init process failed', { err: err.toString()});
    gracefulShutdown(1, {logger, requestId: ''});
  }
};

init();