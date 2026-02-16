import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";

const CreateChannel = ({ setOpen }) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: currentUser.name,
        handle: "",
        desc: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8800/api/users/${currentUser._id}`, { ...inputs, isChannel: true }, { withCredentials: true });
            dispatch(loginSuccess(res.data)); // Update local state
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center z-50">
            <div className="w-[600px] h-screen sm:h-auto bg-[#202020] text-white p-8 flex flex-col gap-6 relative rounded-lg shadow-2xl border border-zinc-700">
                <div className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white" onClick={() => setOpen(false)}>
                    X
                </div>
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create Your Channel</h1>
                    <p className="text-zinc-400 text-sm">You can change these details later.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400 ml-1">Channel Name</label>
                        <input
                            type="text"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Channel Name"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400 ml-1">Handle (e.g. @mychannel)</label>
                        <input
                            type="text"
                            name="handle"
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="@handle"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-zinc-400 ml-1">Description</label>
                        <textarea
                            name="desc"
                            rows={4}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-zinc-700 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Tell viewers about your channel..."
                        />
                    </div>
                </div>

                <button
                    onClick={handleCreate}
                    className="w-full bg-[#3ea6ff] text-zinc-900 font-bold py-3 rounded hover:bg-[#65b8ff] transition-colors mt-2"
                >
                    Create Channel
                </button>
            </div>
        </div>
    );
};

export default CreateChannel;
