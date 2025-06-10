"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
  const [name, setName] = useState("FlashX"); // Default value
  const [leetques, setLeetques] = useState(550);
  const [codeforcesRating, setCodeforcesRating] = useState(1547);
  const [codechefRating, setCodechefRating] = useState(1823);

  useEffect(() => {
    // Retrieve username from localStorage on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.name) {
        setName(userData.name);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <div className="">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="card h-auto w-min rounded-xl bg-gray-600 shadow-lg p-4 mb-8 text-white font-semibold font-mono flex">
            <h1>Coder: </h1>
            <h1 className="font-extrabold text-red-500">
              <u>{name}</u>
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-7xl">
            <div className="bg-gray-800 h-auto w-96 rounded-2xl flex flex-row items-center text-2xl p-6 font-bold text-white shadow-xl">
              <div className="flex flex-col items-center bg-gray-700 p-4 rounded-xl flex-1">
                <h1 className="text-4xl">
                  <span className="text-purple-500">{leetques}</span>
                  <span className="text-xl">/3580</span>
                </h1>
                <h1 className="text-sm font-medium">✅Solved</h1>
                <div className="text-xs mt-2 text-purple-400 font-normal">
                  LeetCode
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1 ml-4">
                <div className="bg-gray-500 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-green-500 text-base">Easy</h1>
                  <h1 className="text-sm">220/880</h1>
                </div>
                <div className="bg-gray-500 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-orange-400 text-base">Medium</h1>
                  <h1 className="text-sm">280/1920</h1>
                </div>
                <div className="bg-gray-500 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-red-600 text-base">Hard</h1>
                  <h1 className="text-sm">50/780</h1>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 h-auto w-96 rounded-2xl flex flex-row items-center text-2xl p-6 font-bold text-white shadow-xl">
              <div className="flex flex-col items-center bg-blue-800 p-4 rounded-xl flex-1">
                <h1 className="text-4xl">
                  <span className="text-blue-300">{codeforcesRating}</span>
                </h1>
                <h1 className="text-sm font-medium">⭐Rating</h1>
                <div className="text-xs mt-2 text-blue-400 font-normal">
                  Codeforces
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1 ml-4">
                <div className="bg-blue-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-cyan-300 text-base">Contests</h1>
                  <h1 className="text-sm">47</h1>
                </div>
                <div className="bg-blue-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-blue-300 text-base">Max Rating</h1>
                  <h1 className="text-sm">1623</h1>
                </div>
                <div className="bg-blue-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-indigo-300 text-base">Rank</h1>
                  <h1 className="text-xs">Specialist</h1>
                </div>
              </div>
            </div>

            <div className="bg-amber-900 h-auto w-96 rounded-2xl flex flex-row items-center text-2xl p-6 font-bold text-white shadow-xl">
              <div className="flex flex-col items-center bg-amber-800 p-4 rounded-xl flex-1">
                <h1 className="text-4xl">
                  <span className="text-amber-300">{codechefRating}</span>
                </h1>
                <h1 className="text-sm font-medium">🏆Rating</h1>
                <div className="text-xs mt-2 text-amber-400 font-normal">
                  CodeChef
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1 ml-4">
                <div className="bg-amber-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-yellow-300 text-base">Contests</h1>
                  <h1 className="text-sm">23</h1>
                </div>
                <div className="bg-amber-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-amber-300 text-base">Max Rating</h1>
                  <h1 className="text-sm">1891</h1>
                </div>
                <div className="bg-amber-700 p-4 text-lg rounded-xl flex flex-col items-center">
                  <h1 className="text-orange-300 text-base">Stars</h1>
                  <h1 className="text-xs">4⭐</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
