const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id }, { _id: 0 });

        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found.", 
            });
        }

        res.status(200).send({
            success: true,
            message: "User successfully retrieved.",
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in GET USER API",
            error
        })
    }
};

const updateUserController = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.id });

        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found.",
            })
        }

        const { username } = req.body;
        if(username){
            user.username = username;
        }
        await user.save();
        res.status(200).send({
            success: true,
            message: "User successfully updated.",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in UPDATE USER API",
        })
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const { email, newPassword, oldPassword } = req.body;
        if(!newPassword || !oldPassword){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields.",
            });
        }

        const user = await User.findOne({ _id: req.body.id });
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        const isMatch = bcrypt.compare(user.password, oldPassword);
        if(!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials.",
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Successfully updated password."
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in UPDATE PASSWORD API.",
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: "Please provide all fields.",
            });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found.",
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password reset successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in RESET PASSWORD API",
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send({
            success: true,
            message: "User successfully deleted.",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in DELETE USER API",
        });
    }
}

module.exports = { getUserController, updateUserController, resetPasswordController, 
    updatePasswordController, deleteUserController };