import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VideoCard from "../components/VideoCard";
import { subscription } from "../redux/userSlice";

const Channel = () => {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const path = useLocation().pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const channelRes = await axios.get(`http://localhost:8800/api/users/find/${path}`);
                const videosRes = await axios.get(`http://localhost:8800/api/videos/user/${path}`);
                setChannel(channelRes.data);
                setVideos(videosRes.data);
            } catch (err) { }
        };
        fetchData();
    }, [path]);

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

    const handleDeleteVideo = (videoId) => {
        setVideos(videos.filter(video => video._id !== videoId));
    }

    const isOwner = currentUser?._id === channel._id;

    return (
        <div className="flex flex-col h-full bg-[#181818] text-white min-h-screen">
            {/* Banner */}
            <div className="h-[200px] bg-zinc-800">
                <img src={channel.bannerUrl || "https://via.placeholder.com/1200x200"} className="w-full h-full object-cover" />
            </div>

            {/* Channel Info */}
            <div className="flex items-center gap-5 px-12 py-5">
                <img src={channel.imgUrl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <span className="text-sm text-zinc-400">@{channel.name} • {channel.subscribers} subscribers</span>
                    <p className="text-sm text-zinc-400 mt-1">
                        {channel.description || "No description available."}
                    </p>
                </div>
                {isOwner ? (
                    <button
                        className="ml-auto bg-zinc-700 text-white font-medium px-5 py-2 rounded max-h-max cursor-pointer hover:bg-zinc-600"
                        onClick={() => alert("Edit Channel functionality coming soon!")}
                    >
                        Edit Channel
                    </button>
                ) : (
                    <button
                        className={`ml-auto bg-[#cc1a00] text-white font-medium px-5 py-2 rounded max-h-max cursor-pointer ${currentUser?.subscribedUsers?.includes(channel._id) ? "bg-zinc-500" : ""}`}
                        onClick={handleSub}
                    >
                        {currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
                    </button>
                )}
            </div>

            <hr className="border-zinc-700 mx-12" />

            {/* Videos Grid */}
            <div className="p-12">
                <h2 className="text-lg font-medium mb-4">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} isOwner={isOwner} onDelete={handleDeleteVideo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Channel;
