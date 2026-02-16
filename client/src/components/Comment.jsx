import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchCommentUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/find/${comment.userId}`);
            setChannel(res.data);
        };
        fetchCommentUser();
    }, [comment.userId]);

    return (
        <div className="flex gap-2.5 my-7">
            <img
                src={channel.imgUrl}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1 text-white">
                <span className="text-sm font-medium">
                    {channel.name} <span className="text-xs text-zinc-400 ml-1">{format(comment.createdAt)}</span>
                </span>
                <span className="text-sm">
                    {comment.desc}
                </span>
            </div>
        </div>
    );
};

export default Comment;
