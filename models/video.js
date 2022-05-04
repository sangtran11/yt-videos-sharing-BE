import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  id: String,
  creator: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
