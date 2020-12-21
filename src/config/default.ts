const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const logger = {
  outputFile: process.env.logger_otp_file || 'app.log'
};

const db = {
  dbUrl: process.env.MONGO_URL || 'mongodb://localhost:11111/${dbName}',
  dbName: process.env.DB_NAME || 'assessment',
};

export {
  PORT,
  HOST,
  logger,
  db,
}