import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    AiFillHome,
    AiOutlineCompass,
    AiOutlineHistory,
    AiOutlineSetting,
    AiOutlineFlag,
    AiOutlineQuestionCircle,
} from "react-icons/ai";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineLocalMovies } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useState } from "react";
import CreateChannel from "./CreateChannel";

const Menu = ({ menuOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={`flex-[1] bg-[#0f0f0f] h-[calc(100vh-56px)] text-white text-[14px] sticky top-[56px] overflow-y-scroll hover:overflow-y-scroll custom-scrollbar ${menuOpen ? "block" : "hidden"} px-4 py-2 transition-all duration-300 min-w-[240px]`}>
                <div className="flex flex-col gap-2">
                    <Link to="/" className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiFillHome size={22} />
                        Home
                    </Link>
                    <Link to="/explore" className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiOutlineCompass size={22} />
                        Explore
                    </Link>
                    <Link to="/subscriptions" className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <MdOutlineSubscriptions size={22} />
                        Subscriptions
                    </Link>

                    {currentUser && !currentUser.isChannel && (
                        <div
                            className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer text-blue-400"
                            onClick={() => setOpen(true)}
                        >
                            <AiOutlinePlusSquare size={22} />
                            Create Channel
                        </div>
                    )}

                    {currentUser && currentUser.isChannel && (
                        <Link to={`/channel/${currentUser._id}`} className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                            <AiOutlinePlusSquare size={22} />
                            Your Channel
                        </Link>
                    )}

                    <hr className="my-3 border-zinc-700" />

                    <Link to="/library" className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <MdOutlineVideoLibrary size={22} />
                        Library
                    </Link>
                    <Link to="/history" className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiOutlineHistory size={22} />
                        History
                    </Link>

                    {!currentUser && (
                        <>
                            <hr className="my-3 border-zinc-700" />
                            <div className="px-3">
                                <p className="mb-3">Sign in to like videos, comment, and subscribe.</p>
                                <Link to="/signin">
                                    <button className="flex items-center gap-2 border border-zinc-700 rounded-full px-4 py-1.5 text-blue-400 hover:bg-[#263850] font-medium text-sm w-max">
                                        <IoMdContact size={24} />
                                        Sign in
                                    </button>
                                </Link>
                            </div>
                            <hr className="my-3 border-zinc-700" />
                        </>
                    )}

                    <h2 className="px-3 font-semibold text-zinc-400 mt-2 mb-1 uppercase text-xs">Best of YouTube</h2>
                    <div className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <MdOutlineLocalMovies size={22} />
                        Movies
                    </div>
                    {/* Add more categories as needed */}

                    <hr className="my-3 border-zinc-700" />

                    <div className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiOutlineSetting size={22} />
                        Settings
                    </div>
                    <div className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiOutlineFlag size={22} />
                        Report history
                    </div>
                    <div className="flex items-center gap-5 px-3 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                        <AiOutlineQuestionCircle size={22} />
                        Help
                    </div>
                </div>
            </div>
            {open && <CreateChannel setOpen={setOpen} />}
        </>
    );
};

export default Menu;
