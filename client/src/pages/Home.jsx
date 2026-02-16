import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Music",
        "Gaming",
        "Sports",
        "News",
        "Movies",
        "Fashion",
        "Learning",
        "Live",
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                let res;
                if (selectedCategory === "All") {
                    res = await axios.get(`http://localhost:8800/api/videos/${type}`);
                } else {
                    res = await axios.get(`http://localhost:8800/api/videos/tags?tags=${selectedCategory.toLowerCase()}`);
                }
                setVideos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchVideos();
    }, [type, selectedCategory]);

    return (
        <div className="flex flex-col h-full bg-[#181818] p-5">
            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar mb-4 sticky top-[56px] z-10 bg-[#181818]">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                ? "bg-white text-black"
                                : "bg-zinc-800 text-white hover:bg-zinc-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} type={type} />
                ))}
            </div>
        </div>
    );
};

export default Home;
