const fs = require("fs/promises");
const path = require("path");

const getVideoFromDisk = async (req, res, next) => {
  const videoId = req.params.videoId;
  console.log("🚀 ~~ file: diskController.js:5 ~~ getVideoFromDisk ~~ videoId:", videoId);

  const options = {
    root: path.resolve(__dirname, "..", ".."),
  };

  res.sendFile(`/uploads/${videoId}`, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", "YEs");
    }
  });
};

const deleteFilesFromTheDisk = async (req, res, next) => {
  const videoId = req.params.videoId;
  console.log("🚀 ~~ file: diskController.js:5 ~~ getVideoFromDisk ~~ videoId:", videoId);

  fs.unlink(`./uploads/${videoId}`, function (err) {
    if (err) {
      next(err);
    }
  });

  res.json({ message: "File Deleted Successfully" });
};

module.exports = { getVideoFromDisk, deleteFilesFromTheDisk };
