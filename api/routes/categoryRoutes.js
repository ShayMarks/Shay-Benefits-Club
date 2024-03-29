const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories); // קבל את כל הקטגוריות
router.get("/:name", categoryController.getCategoryByName); // קבל קטגוריה לפי שם
router.post("/", categoryController.addCategory); // הוסף קטגוריה
router.put("/:id", categoryController.updateCategory); // עדכן קטגוריה לפי ה_id
router.delete("/:name", categoryController.deleteCategoryByName); // מחק קטגוריה לפי שם

module.exports = router;
