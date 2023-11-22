const express = require("express");
const userController = require("./userController");
// const productController = require("./productController");
// import other controllers

const router = express.Router();

// User routes
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

// Product routes
// router.get('/products', productController.getProducts);
// router.post('/products', productController.createProduct);

// Add other routes for different controllers

module.exports = router;
