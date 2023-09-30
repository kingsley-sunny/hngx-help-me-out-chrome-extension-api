const CloudinaryService = require("../services/cloudinaryService");

const uploadFiles = async (req, res, next) => {
  const cloudinary = new CloudinaryService();

  const startTime = Date.now();
  console.log(req.body, req.file);

  // return res.json({ body: req.body });
  const response = await cloudinary.uploadVideo(req.file);

  const endTime = Date.now();

  const timeTaken = endTime - startTime;
  const timeTakenInSeconds = timeTaken / 1000;
  console.log(
    "🚀 ~~ file: controller.js:14 ~~ uploadVideo ~~ timeTakenInSeconds:",
    timeTakenInSeconds
  );

  res.json({ message: "Success", data: response });
};

module.exports = {
  saveVideo: uploadFiles,
};
