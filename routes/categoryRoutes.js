const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategoriesController, 
    updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");

const router = express.Router();

router.post('/create', authMiddleware, createCategoryController);

router.get('/getAll', getAllCategoriesController);

router.put('/update/:id', authMiddleware, updateCategoryController);

router.delete('/delete/:id', authMiddleware, deleteCategoryController);

module.exports = router;