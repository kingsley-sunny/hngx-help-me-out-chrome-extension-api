const { default: axios } = require("axios");

const fetchAndTransformTranscript = async url => {
  console.log("🚀 ~~ file: helpers.js:4 ~~ fetchAndTransformTranscript ~~ url:", url);

  try {
    const response = await axios.get(url, { method: "GET" });

    const transcripts = [];

    if (!response.data) {
      return transcripts;
    }

    for (const transcript of response.data) {
      const startTime = transcript.words[0].start_time;
      const endTime = transcript.words[transcript.words.length - 1].end_time;

      const transcriptString = transcript.transcript;

      transcripts.push({ startTime, endTime, transcript: transcriptString });
    }

    return transcripts;
  } catch (error) {
    console.log("fetchAndTransformTranscript", error.message);
    return [];
  }
};

function AddThumbnailToCloudinaryVideos(url) {
  // split the url by .
  const splittedUrls = url.split(".");

  // then we remove the last extension and add .jpg to the url
  splittedUrls.pop();

  const newUrl = splittedUrls.join(".") + ".jpg";

  return newUrl;
}

module.exports = { fetchAndTransformTranscript, AddThumbnailToCloudinaryVideos };
