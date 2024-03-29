function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // אם המשתמש לא מחובר, הפנה אותו לדף ההתחברות
}
