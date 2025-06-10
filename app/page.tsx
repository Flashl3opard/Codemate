"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    const data = {
      name,
      leetcode,
      codeforces,
      codechef,
    };

    localStorage.setItem("userData", JSON.stringify(data));
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md text-white space-y-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Enter Your Handles
        </h1>
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="LeetCode username"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={leetcode}
          onChange={(e) => setLeetcode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Codeforces username"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={codeforces}
          onChange={(e) => setCodeforces(e.target.value)}
        />
        <input
          type="text"
          placeholder="CodeChef username"
          className="w-full p-2 rounded bg-gray-700 text-white"
          value={codechef}
          onChange={(e) => setCodechef(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
