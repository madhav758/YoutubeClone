import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:8800/api/videos", { ...inputs, tags }, { withCredentials: true });
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`);
    };

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-black/70 flex items-center justify-center z-50">
            <div className="w-[600px] h-[600px] bg-[#202020] text-white p-5 flex flex-col gap-5 relative rounded-lg">
                <div className="absolute top-2 right-4 cursor-pointer text-xl" onClick={() => setOpen(false)}>
                    X
                </div>
                <h1 className="text-center text-xl font-bold">Upload a New Video</h1>
                <label className="text-sm font-medium">Video:</label>
                {videoPerc > 0 ? (
                    "Uploading: " + videoPerc + "%"
                ) : (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        className="border border-zinc-700 p-2 rounded bg-zinc-800"
                    />
                )}
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    className="border border-zinc-700 text-white bg-zinc-800 rounded p-2 outline-none"
                />
                <textarea
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={handleChange}
                    className="border border-zinc-700 text-white bg-zinc-800 rounded p-2 outline-none"
                />
                <input
                    type="text"
                    placeholder="Separate the tags with commas."
                    onChange={handleTags}
                    className="border border-zinc-700 text-white bg-zinc-800 rounded p-2 outline-none"
                />
                <label className="text-sm font-medium">Image:</label>
                {imgPerc > 0 ? (
                    "Uploading: " + imgPerc + "%"
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                        className="border border-zinc-700 p-2 rounded bg-zinc-800"
                    />
                )}
                <button
                    onClick={handleUpload}
                    className="rounded p-2.5 font-medium bg-[#3ea6ff] text-black cursor-pointer hover:bg-[#65b8ff] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={imgPerc < 100 || videoPerc < 100}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default Upload;
