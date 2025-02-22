"use client";

import { useUserContext } from "@/context/useContext";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthPage() {
    const { handleAuthentication } = useUserContext();
    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <p className="text-gray-400 mb-6">Sign in with Google to continue</p>
                <button
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                    onClick={handleAuthentication}
                >
                    <FcGoogle size={24} /> Sign in with Google
                </button>
            </div>
        </div>
    );
}
