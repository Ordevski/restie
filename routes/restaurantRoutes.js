const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantsController,
    getRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

router.get('/getAll', getAllRestaurantsController);

router.get('/get/:id', getRestaurantByIdController);

router.post('/createRestaurant', authMiddleware, createRestaurantController);

router.delete('/delete/:id', authMiddleware, deleteRestaurantController);

module.exports = router;