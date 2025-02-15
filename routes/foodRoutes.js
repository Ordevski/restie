const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const { createFoodController, getEntireMenuController, getSingleFoodController,
  getMenuByRestaurantController, updateFoodController, deleteFoodController,
  placeOrderController,  orderStatusController } = require("../controllers/foodController");

  const router = express.Router();

router.post("/create", authMiddleware, createFoodController);

router.get("/getMenu", getEntireMenuController);

router.get("/get/:id", getSingleFoodController);

router.get("/getByResturant/:id", getMenuByRestaurantController);

router.put("/update/:id", authMiddleware, updateFoodController);

router.delete("/delete/:id", authMiddleware, deleteFoodController);

router.post("/placeorder", authMiddleware, placeOrderController);

router.post("/orderStatus/:id", authMiddleware, adminMiddleware, orderStatusController
);

module.exports = router;