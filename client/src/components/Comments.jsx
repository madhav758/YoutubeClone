import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/comments/${videoId}`);
                setComments(res.data);
            } catch (err) { }
        };
        fetchComments();
    }, [videoId]);

    const handleComment = async (e) => {
        // Basic enter to submit for now, or could add a button
        // e.preventDefault(); 
        if (!currentUser) return; // Optional: redirect to login
        try {
            const res = await axios.post("http://localhost:8800/api/comments", { desc, videoId }, { withCredentials: true });
            setComments([res.data, ...comments]);
            setDesc("");
        } catch (err) { }
    };

    return (
        <div className="text-white">
            <div className="flex items-center gap-2.5 mb-8">
                <img
                    src={currentUser?.imgUrl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col w-full">
                    <input
                        placeholder="Add a comment..."
                        className="bg-transparent border-b border-zinc-700 p-1 w-full text-white outline-none focus:border-white"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    {desc && (
                        <div className="flex justify-end mt-2 gap-3">
                            <button className="text-zinc-400 font-medium hover:text-white" onClick={() => setDesc("")}>Cancel</button>
                            <button className="bg-[#3ea6ff] text-black font-medium px-3 py-1.5 rounded-full hover:bg-[#65b8ff]" onClick={handleComment}>Comment</button>
                        </div>
                    )}
                </div>
            </div>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
