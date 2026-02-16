import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    handle: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    bannerUrl: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: {
        type: [String],
    },
}, { timestamps: true });

export default mongoose.model("Channel", ChannelSchema);
