const { config } = require("dotenv");
const express = require("express");
const { route } = require("./routes/route");
const CloudinaryService = require("./services/cloudinaryService");
const bodyParser = require("body-parser");

const app = express();
config();
bodyParser.urlencoded({ extended: true });
bodyParser.json();

const cloudinary = new CloudinaryService();
cloudinary.initializeConfig();

app.use("/upload", route);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message, statusCode: 500 });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
