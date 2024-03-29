const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//! register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // בדיקה שלא חסרים שדות
    if (!username || !email || !password) {
      return res.status(400).send({ message: "נא למלא את כל השדות הנדרשים." });
    }

    // בדיקה אם שם המשתמש כבר קיים
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).send({ message: "שם משתמש זה כבר קיים." });
    }

    // בדיקה אם המייל כבר קיים
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ message: 'משתמש עם כתובת הדוא"ל הזו כבר קיים.' });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 12);

    // יצירת משתמש חדש
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // שמירת המשתמש במסד הנתונים
    await user.save();

    // שליחת הודעה על הרשמה מוצלחת
    res.redirect('/afterRegisterPage');
  } catch (error) {
    res.status(500).send({ message: "שגיאה ביצירת משתמש." });
  }
};

//! כניסת משתמש
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "משתמש לא נמצא." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "סיסמה שגויה." });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // הגדרת קוקיס עם הטוקן ושליחת המשתמש לדף הבית או לדף האדמין
    res.cookie('token', token, { httpOnly: true });
    
    if (user.isAdmin) {
      res.redirect('/admin'); // הפניה לדף האדמין
    } else {
      res.redirect('/home'); // הפניה לדף הבית
    }
  } catch (error) {
    res.status(500).send({ message: "שגיאה בהתחברות המשתמש." });
  }
};

//! קבלת משתמש לפי שם משתמש והחזרת טוקן
exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }).select("-password"); // הסרת הסיסמה מהתגובה
    if (!user) {
      return res.status(404).send({ message: "משתמש לא נמצא." });
    }
    // יצירת טוקן
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ user, token }); // החזרת המשתמש והטוקן
  } catch (error) {
    res.status(500).send({ message: "שגיאה בקבלת משתמש." });
  }
};

//! קבל את כל המשתמשים
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: 'שגיאה בקבלת נתוני המשתמשים.' });
  }
};

//! מחיקת משתמש לפי שם משתמש
exports.deleteUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOneAndDelete({ username });

    if (!user) {
      return res.status(404).send({ message: 'משתמש לא נמצא.' });
    }

    res.status(200).send({ message: 'משתמש נמחק בהצלחה.' });
  } catch (error) {
    res.status(500).send({ message: 'שגיאה במחיקת המשתמש.' });
  }
};