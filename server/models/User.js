import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0,
    },
    subscribedUsers: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
    isChannel: {
        type: Boolean,
        default: false,
    },
    handle: {
        type: String,
    },
    desc: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
