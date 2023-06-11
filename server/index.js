const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();


// Create the Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Mount the API routes
app.use("/api", apiRoutes);

// Start the server
const port = process.env.PORT || 4040;
app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});
