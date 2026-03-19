import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="h-screen flex items-center justify-center bg-[#0f0f1a] text-white">

            <div className="w-[400px] bg-[#161625] p-8 rounded-xl shadow-lg">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h1>

                <form className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Username"
                        className="p-3 rounded bg-[#1f1f33] border border-[#2a2a40]"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded bg-[#1f1f33] border border-[#2a2a40]"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded bg-[#1f1f33] border border-[#2a2a40]"
                    />

                    <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 transition p-3 rounded font-semibold">
                        Sign Up
                    </button>

                </form>

                <p className="text-sm text-gray-400 mt-6 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:underline">
                        Log In
                    </Link>
                </p>

            </div>

        </div>
    );
}