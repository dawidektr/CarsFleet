// import controllers review, products
const carController = require('../controllers/carController.js')



// router
const CarsRouter = require('express').Router()


// use routers
CarsRouter.post('/cars', carController.addCar)

CarsRouter.get('/cars', carController.getCars)

CarsRouter.get('/cars/:id', carController.getCar)

CarsRouter.put('/cars/:id', carController.updateCar)

CarsRouter.delete('/cars/:id', carController.deleteCar)






// Products router
// router.get('/:id', productController.getOneProduct)

// router.put('/:id', productController.updateProduct)

// router.delete('/:id', productController.deleteProduct)

module.exports = CarsRouter