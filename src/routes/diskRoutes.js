const { getVideoFromDisk, deleteFilesFromTheDisk } = require("../controllers/diskController");
const { asyncWrapper } = require("../middlewares/asyncWrapper");

const videoRoute = require("express").Router();

videoRoute.get("/:videoId", asyncWrapper(getVideoFromDisk));

videoRoute.delete("/:videoId", asyncWrapper(deleteFilesFromTheDisk));

module.exports = { videoRoute };
