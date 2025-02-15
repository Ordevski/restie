const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Restaurant title is required."]
    },
    imageUrl: {
        type: String,
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    foods: {
        type: Array
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);