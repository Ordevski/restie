const Restaurant = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
    try {
        const { title, imageUrl, isOpen, delivery, rating, foods } = req.body;
        if(!title || !isOpen || !delivery) {
            return res.status(500).send({
                success: false,
                message: "Please provide title, delivery status and time of working."
            });
        }
        const newRestaurant = new Restaurant({ title, imageUrl, isOpen, delivery, rating, foods });
        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "Restaurant successfully created.",
            newRestaurant
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in CREATE RESTAURANT API"
        });
    }
};

const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        if(!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No restaurants found."
            });
        }

        res.status(200).send({
            success: true,
            message: "Restaurants retrieved successfully.",
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in GET ALL RESTAURANTS API"
        });
    }
};

const getRestaurantByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(404).send({
                success: false,
                message: "Please provide ID"
            });
        }

        const restaurant = await Restaurant.findById({ _id: id });
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message: "Restaurant not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Restaurant successfully retrieved.",
            restaurant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in GET RESTAURANT BY ID API"
        });
    }
};

const deleteRestaurantController = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(404).send({
                success: false,
                message: "Please provide ID"
            });
        }

        await Restaurant.findByIdAndDelete({ _id: id})

        res.status(200).send({
            success: true,
            message: "Restaurant successfully deleted."
        });
        
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            message: "Error in DELETE RESTAURANT API"
        });
    }
}

module.exports = { createRestaurantController, getAllRestaurantsController,
    getRestaurantByIdController, deleteRestaurantController };