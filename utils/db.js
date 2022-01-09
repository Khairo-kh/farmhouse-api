const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let databaseConnection;

module.exports.connectDataBase = async () => {
  if (databaseConnection) {
    return databaseConnection;
  }
  try {
    databaseConnection = await mongoose.connect(process.env.DATABASE_STR, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Database connected ::: ${databaseConnection.connection.host}`);
  } catch (error) {
    console.error(`Error::: ${error.message}`);
    process.exit(1);
  }
};
