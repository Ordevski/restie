const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'], 
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'], 
    },
    userType: {
        type: String,
        required: [true, 'User type is required.'], 
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);