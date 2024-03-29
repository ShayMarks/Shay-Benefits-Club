// server.js
require("dotenv").config();
const app = require("./app"); // Make sure this path is correct

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
