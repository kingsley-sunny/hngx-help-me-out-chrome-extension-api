const { saveVideo } = require("../controllers/controller");

const route = require("express").Router();
const multer = require("multer");
const { asyncWrapper } = require("../middlewares/asyncWrapper");

const upload = multer({
  fileFilter(req, file, cb) {
    if (file.originalname.includes("image/") || file.originalname.includes("video/")) {
      return cb(null, true);
    }

    cb(new Error("Not an image or video file"), false);
  },
});

route.post("/", asyncWrapper(upload.single("file")), asyncWrapper(saveVideo));

module.exports = { route };
