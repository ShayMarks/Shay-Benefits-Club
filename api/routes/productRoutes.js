const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getAllProducts);
router.get('/:categoryName', productController.getProductsByCategoryName); // עכשיו המסלול של קטגוריה מופיע לפני המסלול של שם המוצר
router.get('/:name', productController.getProductByName);
router.post('/', productController.addProduct);
router.put('/price/:name', productController.updatePriceByName);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
