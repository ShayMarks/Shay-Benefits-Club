const Category = require("../models/category");

// קבל את כל הקטגוריות
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
};

// קבל קטגוריה לפי שם
exports.getCategoryByName = async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  if (!category) {
    return res.status(404).send({ message: "קטגוריה לא נמצאה." });
  }
  res.status(200).json(category);
};

// הוסף קטגוריה
exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return res.status(400).send({ message: "קטגוריה כבר קיימת." });
  }
  const category = new Category({ name, description });
  await category.save();
  res.status(201).send({ message: "קטגוריה נוספה בהצלחה." });
};

// עדכן קטגוריה לפי ה_id
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );
  if (!category) {
    return res.status(404).send({ message: "קטגוריה לא נמצאה." });
  }
  res.status(200).json(category);
};

// מחק קטגוריה לפי שם
exports.deleteCategoryByName = async (req, res) => {
  try {
    const { name } = req.params; // איסוף שם הקטגוריה מהנתיב
    const deletedCategory = await Category.findOneAndDelete({ name });

    if (!deletedCategory) {
      return res.status(404).send({ message: "קטגוריה לא נמצאה." });
    }

    res.status(200).send({ message: "קטגוריה נמחקה בהצלחה." });
  } catch (error) {
    res.status(500).send({ message: "שגיאה במחיקת הקטגוריה." });
  }
};
