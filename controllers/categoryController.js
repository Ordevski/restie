const Category = require("../models/categoryModel")

const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;

        if(!title){
            return res.status(500).send({
                success: false,
                message: "Please provide title"
            });
        }

        const newCategory = new Category({ title, imageUrl });
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: "Category successfully created",
            newCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error CREATE CATEGORY API"
        });
    }
};

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find({});
        if(!categories){
           return res.status(404).send({
                success: false,
                message: "No categories found."
            }); 
        }

        res.status(200).send({
            success: true,
            message: "Categories retrieved.",
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error GET CATEGORY API"
        });
    }
};

const updateCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, imageUrl } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id, { title, imageUrl }, { new: true }
        );

        if(!updatedCategory){
            return res.status(500).send({
                success: false,
                message: "Category Not Found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
          });
     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error UPDATE CATEGORY API"
        });
    }
};

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Please provide Category ID",
            });
        }

        const category = await Category.findById({ id });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category Not Found",
            });
        }

        await Category.findByIdAndDelete({ id });
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error DELETE CATEGORY API"
        });
    }
};

module.exports = { createCategoryController, getAllCategoriesController, 
    updateCategoryController, deleteCategoryController };