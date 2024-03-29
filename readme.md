# Shay - Benefits Club

## General Description:

Shay is a benefit club site that offers various products to registered users. The website includes a user interface for viewing products, purchasing, and adding to the shopping cart, as well as an administration interface for administrators to add, edit, and remove products, categories, and users.

## Technologies:

The website is built using the following technologies:

- Node.js 🚀
- Express.js 🔥
- MongoDB 📦
- Mongoose 🍃
- Bcrypt 🕵🏼‍♂️
- Body-parser 👾
- Handlebars 🎨
- Postman 🟠
- CSS 🖌️
- JavaScript 💻

## Installation and Setup:

1. Make sure you have Node.js and MongoDB installed on your system.
2. Download the source code of the project.
3. Open a terminal in the project directory and run the command `npm install` to install all required dependencies.
4. Create a `.env` file in the root of the project and add the following environment settings:
   `PORT=3000`
   `MONGODB_URI=your_mongodb_connection_uri`
   `JWT_SECRET=your_jwt_secret_key`
   Replace `your_mongodb_connection_uri` with the URI to connect to your MongoDB database, and `your_jwt_secret_key` with a secret key for JWT token signing.
5. Run the command `npm start` to start the server.
6. Open your browser and navigate to http://localhost:3000 (or the port you specified).

make sure to install all required npm packages by running the following command:
`npm install express mongoose dotenv...`

## Database MongoDB:

### User

- id: ObjectId
- username: String
- password: String
- email: String
- isAdmin: Boolean

### Product

- id: ObjectId
- name: String
- description: String
- price: Number
- category: ObjectId
- stock: Number

### Category

- id: ObjectId
- name: String
- description: String

## Application Features:

- Registration and Login
- Online Store
- Shopping Cart
- Administration Interface for Administrators

## Screenshots:

### store page:

<img src="https://i.ibb.co/JQ0RXmS/image.png">

### contact page:

<img src="https://i.ibb.co/wRpJc3q/image.png">

### Login/Register :

<img src="https://i.ibb.co/f28Mzn6/image.png">
<img src="https://i.ibb.co/X80z7YP/image.png">

### admin page:

<img src="https://i.ibb.co/2vHHwFc/image.png">
