const Product = require("../models/product");
const Category = require("../models/category");

// קבל את כל המוצרים
exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("category", "name");
  res.status(200).json(products);
};

// קבל מוצר לפי שם
exports.getProductByName = async (req, res) => {
  const product = await Product.findOne({ name: req.params.name }).populate(
    "category",
    "name"
  );
  if (!product) {
    return res.status(404).send({ message: "מוצר לא נמצא." });
  }
  res.status(200).json(product);
};

// פונקציה לקבלת כל המוצרים ששייכים לקטגוריה לפי השם שלה
exports.getProductsByCategoryName = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    // מצא את הקטגוריה לפי השם
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "קטגוריה לא נמצאה" });
    }

    // מצא את כל המוצרים ששייכים לקטגוריה
    const products = await Product.find({ category: category._id });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשרת" });
  }
};

// הוספת מוצר
exports.addProduct = async (req, res) => {
  const { name, description, price, categoryName, stock, image } = req.body;

  // חפש את הקטגוריה לפי שם
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(400).send({ message: "קטגוריה לא קיימת." });
  }

  // בדוק אם המוצר כבר קיים לפי שם
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return res.status(400).send({ message: "מוצר זה כבר קיים." });
  }

  // יצירת מוצר חדש עם ה-ID של הקטגוריה
  const product = new Product({
    name,
    description,
    price,
    category: category._id, // השתמש ב-ID של הקטגוריה שנמצאה
    stock,
    image,
  });

  await product.save();
  res.status(201).send({ message: "מוצר נוסף בהצלחה." });
};

// עדכון מחיר לפי שם
exports.updatePriceByName = async (req, res) => {
  const { name } = req.params; // קבלת שם המוצר מהפרמטרים שבנתיב
  const { price } = req.body; // קבלת המחיר החדש מגוף הבקשה
  const product = await Product.findOneAndUpdate(
    { name },
    { $set: { price: price } },
    { new: true }
  );
  if (!product) {
    return res.status(404).send({ message: "מוצר לא נמצא." });
  }
  res.status(200).json(product);
};

// עדכון מוצר לפי ID
exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, image } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name, description, price, category, stock, image },
    { new: true }
  );
  if (!product) {
    return res.status(404).send({ message: "מוצר לא נמצא." });
  }
  res.status(200).json(product);
};

// מחיקת מוצר
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).send({ message: "מוצר לא נמצא." });
  }
  res.status(200).send({ message: "מוצר נמחק בהצלחה." });
};
