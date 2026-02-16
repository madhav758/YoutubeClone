import React from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineVideoCameraAdd, AiOutlineBell } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';
import { BsMic } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Navbar = ({ setMenuOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <div className="flex justify-between items-center px-6 h-14 bg-[#0f0f0f] text-white fixed w-full z-10 sticky top-0">
                {/* Left Section: Menu + Logo */}
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-zinc-800 rounded-full cursor-pointer"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <AiOutlineMenu size={24} />
                    </button>
                    <Link to="/" className="flex items-center gap-1">
                        <FaYoutube size={32} className="text-red-600" />
                        <span className="text-xl font-bold tracking-tighter">YouTube</span>
                    </Link>
                </div>

                {/* Middle Section: Search + Mic */}
                <div className="hidden md:flex items-center flex-1 justify-center max-w-[700px]">
                    <div className="flex items-center w-full max-w-[600px]">
                        <div className="flex w-full items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#121212] border border-zinc-700 rounded-l-full px-4 py-2 text-zinc-200 focus:outline-none focus:border-blue-500 shadow-inner"
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <button
                                className="bg-zinc-800 border border-l-0 border-zinc-700 px-5 py-2 rounded-r-full hover:bg-zinc-700 cursor-pointer"
                                onClick={() => navigate(`/search?q=${q}`)}
                            >
                                <AiOutlineSearch size={22} className="text-zinc-200" />
                            </button>
                        </div>
                        <button className="ml-4 p-2 bg-[#181818] rounded-full hover:bg-zinc-800 cursor-pointer">
                            <BsMic size={20} />
                        </button>
                    </div>
                </div>

                {/* Right Section: Auth / User Actions */}
                <div className="flex items-center gap-3">
                    {currentUser ? (
                        <>
                            <button className="p-2 hover:bg-zinc-800 rounded-full" onClick={() => setOpen(true)}>
                                <AiOutlineVideoCameraAdd size={24} />
                            </button>
                            <button className="p-2 hover:bg-zinc-800 rounded-full">
                                <AiOutlineBell size={24} />
                            </button>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
                                    {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                                </div>
                                <span className="font-medium text-sm hidden sm:block">{currentUser.name}</span>
                            </div>
                            <button
                                className="bg-zinc-800 px-3 py-1 rounded-full text-sm hover:bg-zinc-700 ml-2 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="md:hidden p-2 hover:bg-zinc-800 rounded-full">
                                <AiOutlineSearch size={24} />
                            </button>
                            <Link to="/signin">
                                <button className="flex items-center gap-2 border border-zinc-700 rounded-full px-4 py-1.5 text-blue-400 hover:bg-[#263850] font-medium text-sm">
                                    <IoMdContact size={24} />
                                    Sign in
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {open && <Upload setOpen={setOpen} />}
        </>
    );
};

export default Navbar;
