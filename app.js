require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

// הגדרת Handlebars
const hbs = engine({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials"), // וודא שזו ההגדרה הנכונה למיקום ה-partials שלך
});
app.engine("hbs", hbs);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// נתיבים
const userRoutes = require("./api/routes/userRoutes");
const productRoutes = require("./api/routes/productRoutes");
const categoryRoutes = require("./api/routes/categoryRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// נתיב התחברות ראשי
app.get("/", (req, res) => {
  res.redirect("/login");
});

// נתיבים לדפי ההתחברות והרשמה
app.get("/login", (req, res) => {
  res.render("login");
});

// נתיב לדף ההרשמה
app.get("/register", (req, res) => {
  res.render("register");
});

// נתיב לדף אחרי ההרשמה
app.get("/afterRegisterPage", (req, res) => {
  res.render("afterRegisterPage");
});

// נתיב לדף הבית
app.get("/home", (req, res) => {
  res.render("home");
});

// נתיב לדף הצור קשר
app.get("/contact", (req, res) => {
  res.render("contact");
});

// נתיב לדף החנהות
app.get("/shop", (req, res) => {
  res.render("shop");
});

// נתיבים לדפי האדמין האדמין
app.get("/admin", (req, res) => {
  res.render("admin/adminHome");
});
app.get("/delete-product", (req, res) => {
  res.render("admin/adminPdelete");
});
app.get("/list-product", (req, res) => {
  res.render("admin/adminPlist");
});
app.get("/list-users", (req, res) => {
  res.render("admin/adminUlist");
});
app.get("/list-category", (req, res) => {
  res.render("admin/adminClist");
});
app.get("/add-category", (req, res) => {
  res.render("admin/adminCadd");
});

module.exports = app;
