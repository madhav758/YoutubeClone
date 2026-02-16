import Channel from "../models/Channel.js";
import { createError } from "../utils/error.js";

export const createChannel = async (req, res, next) => {
    const newChannel = new Channel({
        userId: req.user.id,
        ...req.body,
    });
    try {
        const savedChannel = await newChannel.save();
        res.status(200).json(savedChannel);
    } catch (err) {
        next(err);
    }
};

export const updateChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));

        if (req.user.id === channel.userId) {
            const updatedChannel = await Channel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedChannel);
        } else {
            return next(createError(403, "You can update only your channel!"));
        }
    } catch (err) {
        next(err);
    }
};

export const deleteChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));

        if (req.user.id === channel.userId) {
            await Channel.findByIdAndDelete(req.params.id);
            res.status(200).json("Channel has been deleted.");
        } else {
            return next(createError(403, "You can delete only your channel!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getChannel = async (req, res, next) => {
    try {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return next(createError(404, "Channel not found!"));
        res.status(200).json(channel);
    } catch (err) {
        next(err);
    }
};
