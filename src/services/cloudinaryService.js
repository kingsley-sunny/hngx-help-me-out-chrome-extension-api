const cloudinary = require("cloudinary").v2;
const toStream = require("buffer-to-stream");

class CloudinaryService {
  initializeConfig() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async uploadFile(file) {
    console.log("uploadFile", "CloudinaryAdapter");

    const uploader = this.#uploadVideo(file);

    const uploadedData = await uploader();

    return { url: uploadedData.secure_url, public_id: uploadedData.public_id };
  }

  async uploadVideo(file) {
    console.log("uploadVideo", "CloudinaryAdapter");

    const uploader = this.#uploadVideo(file);

    const uploadedData = await uploader();

    return uploadedData;
  }

  async uploadMultipleVideos(files) {
    console.log("uploadMultipleVideos", "CloudinaryAdapter");

    const uploaders = files.map(file => this.#uploadVideo(file));

    const uploadedData = [];

    for (const uploader of uploaders) {
      const response = await uploader();
      uploadedData.push(response);
    }

    return uploadedData;
  }

  #uploadVideo(file) {
    return () => {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: process.env.CLOUDINARY_FOLDER,
            resource_type: "video",
            chunk_size: 6000000,

            eager: [
              { width: 300, height: 300, crop: "pad", audio_codec: "none" },
              { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" },
            ],
            eager_async: true,
            raw_convert: "google_speech",
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }

            resolve(result);
          }
        );

        toStream(file.buffer, 50000).pipe(upload);
      });
    };
  }

  async getFile(publicId, resourceType) {
    try {
      console.log("getFile", "CloudinaryAdapter");
      const response = await cloudinary.api.resource(publicId, {
        resource_type: resourceType,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  #uploadImage(file) {
    return () => {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: process.env.CLOUDINARY_FOLDER,
            resource_type: "image",
            chunk_size: 6000000,
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }

            resolve(result);
          }
        );

        toStream(file.buffer, 50000).pipe(upload);
      });
    };
  }
}

module.exports = CloudinaryService;
