const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Animal = require('../../models/animalModel');

dotenv.config({ path: './config.env' });
const DB = `mongodb+srv://kairyas:2lda8xGP5GaMY0ZH@cluster0.catrr.mongodb.net/farm-database?retryWrites=true&w=majority`;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful!');
  });
const animals = JSON.parse(
  fs.readFileSync(`${__dirname}/../animals.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Animal.create(animals);
    console.log('Data loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Animal.deleteMany();
    console.log('deleted all data!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
