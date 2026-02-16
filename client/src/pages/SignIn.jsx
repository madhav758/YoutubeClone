import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("http://localhost:8800/api/auth/signin", { email, password }, { withCredentials: true });
            dispatch(loginSuccess(res.data));
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            await axios.post("http://localhost:8800/api/auth/signup", { name, email, password }, { withCredentials: true });
            // For now, redirect to login or home. 
            // If the user requirement implies auto-login, we would need to chain a signin call here or adjust backend.
            // But since "when logged in" implies the state change, I'll navigate, and if they aren't logged in, they can sign in.
            // Actually, best UX is to sign them in. Let's try to sign them in immediately after signup.
            try {
                const res = await axios.post("http://localhost:8800/api/auth/signin", { email, password }, { withCredentials: true });
                dispatch(loginSuccess(res.data));
                navigate("/");
            } catch (loginErr) {
                // Fallback if auto-login fails
                dispatch(loginFailure());
            }
        } catch (err) {
            dispatch(loginFailure());
        }
    };

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] text-white">
            <div className="flex items-center gap-2.5 mb-5 opacity-100">
                <span className="text-xl font-bold">
                    {showSignUp ? "Sign Up" : "Sign In"}
                </span>
            </div>
            <div className="flex flex-col items-center bg-[#202020] border border-zinc-700 py-5 px-10 gap-2.5 rounded-lg w-full max-w-[400px]">
                <h1 className="text-2xl font-semibold">
                    {showSignUp ? "Create an account" : "Welcome back"}
                </h1>
                <h2 className="text-xl font-light mb-5">to continue to YouTube</h2>

                {showSignUp && (
                    <input
                        className="border border-zinc-700 rounded p-2.5 bg-transparent w-full text-white focus:outline-none focus:border-blue-500"
                        placeholder="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}

                <input
                    className="border border-zinc-700 rounded p-2.5 bg-transparent w-full text-white focus:outline-none focus:border-blue-500"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="border border-zinc-700 rounded p-2.5 bg-transparent w-full text-white focus:outline-none focus:border-blue-500"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="rounded px-5 py-2.5 font-medium cursor-pointer bg-blue-500 hover:bg-blue-600 text-black w-full mt-2"
                    onClick={showSignUp ? handleRegister : handleLogin}
                >
                    {showSignUp ? "Sign up" : "Sign in"}
                </button>

                <div className="mt-4 text-sm text-zinc-400">
                    {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={toggleForm}
                    >
                        {showSignUp ? "Sign in" : "Sign up"}
                    </span>
                </div>
            </div>

            <div className="flex mt-2.5 text-xs text-zinc-400 w-full max-w-[400px] justify-between">
                <span className="cursor-pointer hover:text-white">English(USA)</span>
                <div className="flex gap-2.5">
                    <span className="cursor-pointer hover:text-white">Help</span>
                    <span className="cursor-pointer hover:text-white">Privacy</span>
                    <span className="cursor-pointer hover:text-white">Terms</span>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
