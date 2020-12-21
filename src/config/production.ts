const db = {
  dbUrl: process.env.MONGO_URL || 'mongodb://localhost:11111/${dbName}',
  dbName: process.env.DB_NAME || 'assessment',
};

export {
  db
}