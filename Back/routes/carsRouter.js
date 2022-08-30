const carController = require('../controllers/carController.js');

const CarsRouter = require('express').Router();

CarsRouter.post('/cars', carController.addCar);
CarsRouter.get('/cars', carController.getCars);
CarsRouter.put('/cars/:id', carController.updateCar);
CarsRouter.delete('/cars/:id', carController.deleteCar);


module.exports = CarsRouter;