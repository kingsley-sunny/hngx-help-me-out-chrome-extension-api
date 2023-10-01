const { config } = require("dotenv");
const express = require("express");
const { route } = require("./routes/route");
const CloudinaryService = require("./services/cloudinaryService");
const bodyParser = require("body-parser");
const { sequelize } = require("./database/database");
const { default: axios } = require("axios");
const fs = require("fs/promises");
const { videoRoute } = require("./routes/diskRoutes");
const cors = require("cors");

const app = express();

config();
app.use(cors());
bodyParser.urlencoded({ extended: true });
bodyParser.json();

const cloudinary = new CloudinaryService();
cloudinary.initializeConfig();

app.use("/upload", route);

app.use("/videos", videoRoute);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message, statusCode: 500 });
});

// INITIALIZE SEQUELIZE to create the database

sequelize.sync({ force: false }).then(res => {
  console.log("Connected to the Database");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
