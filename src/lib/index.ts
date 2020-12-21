import config from 'config';
import { createLogger, format, transports, Logger } from 'winston';

import { disconnect } from './db';
import { ILogger } from '../common/Types/ILogger';
import { Context } from '../common/Types/Context';

const { combine, splat, timestamp, printf } = format;

const logsFormat = printf( ({ level, message, timestamp: time, ...metadata}) => {
  let msg = `${time} [${level}] : ${message} `
  if(metadata) {
    msg += JSON.stringify(metadata)
  }
  return msg
});

const makeLogger = ():Logger => createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    format.colorize(),
    splat(),
    timestamp(),
    logsFormat
  ),
  transports: [
    new transports.Console({ level: 'info' }),
    new transports.File({ filename: config.get("logger.outputFile"), level: 'debug' }),
  ],
  exitOnError: false,
});

const gracefulShutdown = async (signal: number = 0, ctx: Context) => {
  const { logger: contextualLogger, requestId } = ctx;
  const log = contextualLogger.child({ requestId })
  try {
    log.info('gracefulShutdown process started');
    await disconnect(ctx);
    log.info('gracefulShutdown process finished');
    process.exit(signal);
  } catch (err) {
    log.error('gracefulShutdown process failed', {err});
    process.exit(1);
  }
};

const logger = makeLogger();

export {
  gracefulShutdown,
  logger,
  Logger
}