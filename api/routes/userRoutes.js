const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//! הגדרת נתיבים עבור משתמשים
router.post("/register", userController.register); // register
router.post("/login", userController.login); // login
router.get("/:username", userController.getUserByUsername); // get user by username
router.get('/', userController.getAllUsers);
router.delete('/:username', userController.deleteUserByUsername); // delete user

module.exports = router;
