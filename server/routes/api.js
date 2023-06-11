const express = require("express");
const bookRoute = require("./bookRoute");

// Create the Express app
const app = express();

// Mount the book routes
app.use("/books", bookRoute);

// Export the app
module.exports = app;
