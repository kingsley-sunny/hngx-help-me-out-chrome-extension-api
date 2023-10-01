const {
  fetchAndTransformTranscript,
  AddThumbnailToCloudinaryVideos,
} = require("../helpers/helpers");
const VideoModel = require("../models/VideoModel");
const CloudinaryService = require("../services/cloudinaryService");

const cloudinary = new CloudinaryService();

const uploadFiles = async (req, res, next) => {
  const startTime = Date.now();

  const response = await cloudinary.uploadVideo(req.file);

  const uploads = [];

  const thumbnail = AddThumbnailToCloudinaryVideos(response.secure_url);

  const newUpload = new VideoModel({
    public_id: response.public_id,
    url: response.secure_url,
    transcript_url: `${response.public_id}.transcript`,
    transcript_public_id: `${response.public_id}.transcript`,
    thumbnail,
    bytes: response.bytes,
  });

  const upload = await newUpload.save();

  uploads.push(upload.dataValues);

  const endTime = Date.now();

  const timeTaken = endTime - startTime;
  const timeTakenInSeconds = timeTaken / 1000;
  console.log(
    "🚀 ~~ file: controller.js:14 ~~ uploadVideo ~~ timeTakenInSeconds:",
    timeTakenInSeconds
  );

  res.json({ message: "Success", data: uploads });
};

const getSingleVideo = async (req, res, next) => {
  console.log("getSingleVideo", "Controller");

  const { videoId } = req.params;

  // retrieve the video from the database
  const video = await VideoModel.findOne({
    where: {
      id: videoId,
    },
  });

  // get the transcript url from cloudinary
  const transcript = await cloudinary.getFile(video.transcript_public_id, "raw");

  // send a fetch request to get the transcript url from cloudinary and transform it
  const formattedTranscript = await fetchAndTransformTranscript(transcript.secure_url);

  return res.json({ message: "Success", data: { video, transcript: formattedTranscript } });
};

const getAllVideos = async (req, res, next) => {
  console.log("getAllVideos", "Controller");

  const videos = await VideoModel.findAll();

  return res.json({ message: "Success", data: videos });
};

module.exports = {
  saveVideo: uploadFiles,
  getSingleVideo,
  getAllVideos,
};
