const { saveVideo, getSingleVideo, getAllVideos } = require("../controllers/controller");

const route = require("express").Router();
const multer = require("multer");
const { asyncWrapper } = require("../middlewares/asyncWrapper");

const upload = multer({
  fileFilter(req, file, cb) {
    if (file.mimetype.includes("video/")) {
      return cb(null, true);
    }

    cb(new Error("Not a video file"), false);
  },
});

route.post("/", asyncWrapper(upload.single("file")), asyncWrapper(saveVideo));

route.get("/", asyncWrapper(getAllVideos));

route.get("/:videoId", asyncWrapper(getSingleVideo));

module.exports = { route };
