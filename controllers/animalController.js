const fs = require('fs');

const animals = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev_data/animals.json`)
);

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.no || !req.body.birth_date) {
    return res.status(400).json({
      status: 'fail',
      message: 'must have the animal identifier number and birth date',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  if (val * 1 > animals.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};
exports.getAllAnimals = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: animals.length,
    data: { animals },
  });
};

exports.createAnimal = (req, res) => {
  const newId = animals[animals.length - 1].id + 1;
  const newAnimal = Object.assign({ id: newId }, req.body);

  animals.push(newAnimal);
  fs.writeFile(
    `${__dirname}/../dev_data/animals.json`,
    JSON.stringify(animals),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          animal: newAnimal,
        },
      });
    }
  );
};

exports.getAnimal = (req, res) => {
  const animal = animals.find((obj) => obj.id == req.params.id * 1);
  res.status(200).json({
    status: 'success',
    data: { animal },
  });
};

exports.updateAnimal = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { animal: '... updated animal here ...' },
  });
};

exports.deleteAnimal = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
