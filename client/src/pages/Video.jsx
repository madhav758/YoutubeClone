import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

import Comments from "../components/Comments";
import { subscription } from "../redux/userSlice";

const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];
    const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`http://localhost:8800/api/videos/find/${path}`);
                const channelRes = await axios.get(`http://localhost:8800/api/users/find/${videoRes.data.userId}`);
                setVideo(videoRes.data);
                setChannel(channelRes.data);
            } catch (err) { }
        };
        fetchData();
    }, [path]);

    const handleLike = async () => {
        if (!currentUser) return;
        await axios.put(`http://localhost:8800/api/videos/like/${video._id}`, {}, { withCredentials: true });
        setVideo((prev) => {
            return {
                ...prev,
                likes: [...new Set([...(prev.likes || []), currentUser._id])],
                dislikes: (prev.dislikes || []).filter((userId) => userId !== currentUser._id)
            }
        })
    };

    const handleDislike = async () => {
        if (!currentUser) return;
        await axios.put(`http://localhost:8800/api/videos/dislike/${video._id}`, {}, { withCredentials: true });
        setVideo((prev) => {
            return {
                ...prev,
                dislikes: [...new Set([...(prev.dislikes || []), currentUser._id])],
                likes: (prev.likes || []).filter((userId) => userId !== currentUser._id)
            }
        })
    };

    const handleSub = async () => {
        if (!currentUser) return;
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`, {}, { withCredentials: true })
            : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`, {}, { withCredentials: true });
        dispatch(subscription(channel._id));
        setChannel((prev) => {
            return {
                ...prev,
                subscribers: currentUser.subscribedUsers.includes(channel._id) ? prev.subscribers - 1 : prev.subscribers + 1
            }
        })
    };

    return (
        <div className="flex bg-[#181818] min-h-screen text-white">
            <div className="flex-[5] p-6">
                <div className="w-full h-[500px] bg-[#000]">
                    {/* Video Player Placeholder - in real app would be video tag or iframe */}
                    {/* Assuming videoUrl is a direct link to mp4 or similar */}
                    <video src={video.videoUrl} controls className="w-full h-full object-contain" />
                    {/* IF iframe: <iframe width="100%" height="100%" src={video.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                </div>

                <h1 className="text-xl font-bold mt-4 mb-2">{video.title}</h1>

                <div className="flex items-center justify-between">
                    <div className="text-zinc-400 text-sm">
                        {video.views} views • {format(video.createdAt)}
                    </div>
                    <div className="flex gap-5 text-white">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>
                            {video.likes?.includes(currentUser?._id) ? (
                                <AiFillLike size={24} />
                            ) : (
                                <AiOutlineLike size={24} />
                            )}
                            {video.likes?.length}
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleDislike}>
                            {video.dislikes?.includes(currentUser?._id) ? (
                                <AiFillDislike size={24} />
                            ) : (
                                <AiOutlineDislike size={24} />
                            )}
                            Dislike
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <RiShareForwardLine size={24} />
                            Share
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <MdOutlineSaveAlt size={24} />
                            Save
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-zinc-700" />

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Link to={`/channel/${channel._id}`}>
                            <img
                                src={channel.imgUrl}
                                className="w-12 h-12 rounded-full object-cover bg-gray-500"
                            />
                        </Link>
                        <div className="flex flex-col text-white">
                            <Link to={`/channel/${channel._id}`}>
                                <span className="font-medium cursor-pointer">{channel.name}</span>
                            </Link>
                            <span className="text-xs text-zinc-400">{channel.subscribers} subscribers</span>
                            <p className="mt-4 text-sm whitespace-pre-line">
                                {video.desc}
                            </p>
                        </div>
                    </div>
                    <button
                        className={`bg-[#cc1a00] text-white font-medium px-5 py-2 rounded max-h-max cursor-pointer ${currentUser?.subscribedUsers?.includes(channel._id) ? "bg-zinc-500" : ""}`}
                        onClick={handleSub}
                    >
                        {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                    </button>
                </div>

                <hr className="my-4 border-zinc-700" />

                <Comments videoId={video._id} />
            </div>

            {/* Recommendation Section */}
            <div className="flex-[2] p-6 hidden lg:block">
                {/* Could add Recommendation component here */}
                <div className="text-zinc-400">Recommendations coming soon...</div>
            </div>
        </div>
    );
};

export default Video;
