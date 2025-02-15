const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { username, email, password, answer } = req.body;
        if(!username || !email || !password || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        const existingUser = await User.findOne({ email: email });
        if(existingUser) {
            return res.status(500).send({
                success: false,
                message: 'Email already registered.',
            });
        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: hashedPassword, answer });
        res.status(201).send({
           success: true,
           message: "Successfully registered." 
        });
        
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
        })
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide both Email and Password.',
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found.',
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        // token creation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: 'Successfully logged in.',
            token
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
        })
    }
};


module.exports = { registerController, loginController };