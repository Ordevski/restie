const Food = require("../models/foodModel");
const Order = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const { title, description, price, imageUrl, foodTags, category, restaurant, rating } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields.",
      });
    }
    const newFood = new Food({ title, description, price, imageUrl, foodTags, category, restaurant, rating });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created.",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in CREATE FOOD API.",
      error,
    });
  }
};

const getEntireMenuController = async (req, res) => {
  try {
    const foods = await Food.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No menu items found.",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET ENTIRE MENU API",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide the ID.",
      });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this ID.",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in SINGLE FOOD API.",
      error,
    });
  }
};

const getMenuByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide ID.",
      });
    }
    const food = await Food.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found for this restaurant.",
      });
    }
    res.status(200).send({
      success: true,
      message: "",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in MENU BY RESTAURANT API.",
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "No ID was found",
      });
    }
    const food = await Food.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found.",
      });
    }
    const { title, description, price, imageUrl, foodTags, category, restaurant, rating } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      foodID,
      { title, description, price, imageUrl, foodTags, category, restaurant, rating },
      { new: true }
    );
    
    res.status(200).send({
      success: true,
      message: "Food item Updated.",
      updatedFood
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in UPDATE FOOD API.",
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food ID.",
      });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found.",
      });
    }
    await Food.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item successfully deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in DELETE FOOD API.",
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }

    // calculate price
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });

    const newOrder = new Order({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully.",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in PLACE ORDER API",
    });
  }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide a valid Order ID.",
      });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order status updated.",
      order
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in ORDER STATUS API.",
    });
  }
};

module.exports = { createFoodController, getEntireMenuController, getSingleFoodController, getMenuByRestaurantController,
  updateFoodController, deleteFoodController, placeOrderController, orderStatusController,  };