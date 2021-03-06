import bcrypt from "bcryptjs";
import User from "../models/users.js";
import Video from "../models/video.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  res.setHeader("set-cookie", "username=tipsjs");
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist " });
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isCorrectPassword)
      return res.status(404).json({ message: "Invalid credentials " });
    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. " });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exist " });
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. " });
  }
};

export const shareVideo = async (req, res) => {
  const video = req.body;
  const newVideo = new Video({
    ...video,
    createdAt: new Date().toISOString(),
  });
  try {
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
