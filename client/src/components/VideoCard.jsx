import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const VideoCard = ({ type, video, isOwner, onDelete }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/find/${video.userId}`);
            setChannel(res.data);
        };
        fetchChannel();
    }, [video.userId]);

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await axios.delete(`http://localhost:8800/api/videos/${video._id}`, { withCredentials: true });
                if (onDelete) onDelete(video._id);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className={`w-full mb-11 relative group ${type === "sm" ? "flex gap-2.5 mb-2.5" : ""}`}>
            {isOwner && (
                <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-black/70 rounded-full cursor-pointer hover:bg-red-600 text-white" onClick={handleDelete} title="Delete Video">
                        <AiFillDelete size={18} />
                    </div>
                    <div className="p-2 bg-black/70 rounded-full cursor-pointer hover:bg-blue-600 text-white" onClick={(e) => { e.preventDefault(); alert("Edit coming soon") }} title="Edit Video">
                        <AiFillEdit size={18} />
                    </div>
                </div>
            )}
            <Link to={`/video/${video._id}`} style={{ textDecoration: "none", flex: 1 }}>
                <img
                    src={video.imgUrl}
                    className={`w-full h-52 bg-[#999] flex-1 rounded-xl object-cover ${type === "sm" ? "h-30 w-40 flex-1" : ""}`}
                />
            </Link>
            <div className={`flex mt-4 gap-3 ${type === "sm" ? "mt-0 flex-1" : ""}`}>
                <Link to={`/channel/${video.userId}`} style={{ textDecoration: "none" }}>
                    <img
                        src={channel.imgUrl}
                        className={`w-9 h-9 rounded-full bg-[#999] ${type === "sm" ? "hidden" : ""}`}
                    />
                </Link>
                <div className="flex flex-col text-white">
                    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
                        <h1 className="text-base font-bold text-white">{video.title}</h1>
                    </Link>
                    <Link to={`/channel/${video.userId}`} style={{ textDecoration: "none" }}>
                        <h2 className="text-sm text-zinc-400 my-1">{channel.name}</h2>
                    </Link>
                    <div className="text-sm text-zinc-400">
                        {video.views} views • {format(video.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
