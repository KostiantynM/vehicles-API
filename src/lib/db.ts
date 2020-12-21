import _ from 'lodash';
import config from 'config';
import Mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

import {Context} from '../common/Types/Context';

let dbConnection: Mongoose.Connection;

/**
 * Used on Application bootstrap
 * @returns database connection
 */
const connect = async (ctx: Context): Promise<void> => {
  const { logger } = ctx;
  logger.info('createConnection1: setup db connection');
  try {
    const dbUrl = config.get('db.dbUrl') as string;
    const dbName = config.get('db.dbName') as string;
    const uri = _.template(dbUrl)({dbName});
    if (dbConnection) return;
    logger.info('createConnection1: setup db connection', {uri});
    await Mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    dbConnection = Mongoose.connection;
    dbConnection.once("open", () => {
      logger.info("Connected to database");
    });
    dbConnection.on("error", () => {
      logger.error("Error connecting to database");
    });

  } catch (e) {
    logger.error('createConnection: cannot established connection to database', {
      errMsg: e.toString(),
      stack: e.stack,
    });
    throw e;
  }
};

/**
 * close DB connection on demand
 */
const disconnect = async (ctx: Context): Promise<void> => {
  const { logger } = ctx;
  if (!dbConnection) {
    return;
  }
  await Mongoose.disconnect();
  logger.info('connection closed successfully');
};

export {
  connect,
  disconnect,
  ObjectID,
};