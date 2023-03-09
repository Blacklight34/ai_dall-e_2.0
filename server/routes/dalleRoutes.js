import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
const router = express.Router();
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration)
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Dall-e" });
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response?.data?.data[0]?.url;
    res.status(200).json({ url: image_url });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error?.response?.data?.error?.message || "Something went wrong");
  }
});
export default router;
