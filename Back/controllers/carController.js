const db = require('../models');
const Car = db.cars;

const addCar = async (req, res) => {
    let info = {
        mark: req.body.mark,
        model: req.body.model,
        year: req.body.year,
        launchDate: req.body.launchDate,
        mileage: req.body.mileage,
    };

    const car = await Car.create(info);
    res.status(200).send(car);
};

const getCars = async (req, res) => {
    let cars = await Car.findAll({});
    res.status(200).send(cars);
};


const updateCar = async (req, res) => {
    let id = req.params.id;
    const car = await Car.update(req.body, { where: { id: id } });

    res.status(200).send(car);
};

const deleteCar = async (req, res) => {
    let id = req.params.id;
    await Car.destroy({ where: { id: id } });
    res.status(200).send('Car is deleted !');
};

module.exports = {
    addCar,
    getCars,
   
    updateCar,
    deleteCar,
};
