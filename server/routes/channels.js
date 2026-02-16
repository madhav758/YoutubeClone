import express from "express";
import { createChannel, deleteChannel, getChannel, updateChannel } from "../controllers/channel.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//create a channel
router.post("/", verifyToken, createChannel)

//update a channel
router.put("/:id", verifyToken, updateChannel)

//delete a channel
router.delete("/:id", verifyToken, deleteChannel)

//get a channel
router.get("/find/:id", getChannel)


export default router;
