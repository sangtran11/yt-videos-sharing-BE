import express from "express";
import {
  signin,
  signup,
  shareVideo,
  fetchVideos,
} from "../controllers/users.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/share-video", shareVideo);
router.get("/fetch-videos", fetchVideos);
export default router;
