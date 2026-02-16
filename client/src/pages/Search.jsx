import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:8800/api/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

    return (
        <div className="flex flex-col h-full bg-[#181818] p-5">
            <h2 className="text-white mb-4 text-lg font-medium">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map(video => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Search;
