const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/getUser', authMiddleware, getUserController);

router.put('/updateUser', authMiddleware, updateUserController);

router.put('/updatePassword', authMiddleware, updatePasswordController);

router.post('/resetPassword', authMiddleware, resetPasswordController);

router.delete('/deleteUser/:id', authMiddleware, deleteUserController);

module.exports = router;