"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
  const [name, setName] = useState("FlashX");

  const [leetques, setLeetques] = useState(0);
  const [leetEasy, setLeetEasy] = useState(0);
  const [leetMedium, setLeetMedium] = useState(0);
  const [leetHard, setLeetHard] = useState(0);

  const [codeforcesRating, setCodeforcesRating] = useState(0);
  const [codeforcesContests, setCodeforcesContests] = useState(0);
  const [codeforcesMaxRating, setCodeforcesMaxRating] = useState(0);
  const [codeforcesRank, setCodeforcesRank] = useState("Unrated");

  const [codechefRating, setCodechefRating] = useState(0);
  const [codechefCountryRank, setCodechefCountryRank] = useState(0);
  const [codechefMaxRating, setCodechefMaxRating] = useState(0);
  const [codechefStars, setCodechefStars] = useState("Unrated");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.name) setName(userData.name);

      const leet = userData.leetcode;
      const cf = userData.codeforces;
      const cc = userData.codechef;

      if (leet) {
        fetch(`https://competeapi.vercel.app/user/leetcode/${leet}`)
          .then((res) => res.json())
          .then((data) => {
            const stats = data.data.matchedUser.submitStats.acSubmissionNum;
            setLeetques(
              stats.find((s: any) => s.difficulty === "All")?.count || 0
            );
            setLeetEasy(
              stats.find((s: any) => s.difficulty === "Easy")?.count || 0
            );
            setLeetMedium(
              stats.find((s: any) => s.difficulty === "Medium")?.count || 0
            );
            setLeetHard(
              stats.find((s: any) => s.difficulty === "Hard")?.count || 0
            );
          });
      }

      if (cf) {
        fetch(`https://competeapi.vercel.app/user/codeforces/${cf}`)
          .then((res) => res.json())
          .then((data) => {
            const userInfo = data[0];
            const ratings = data[1]?.ratings || [];
            setCodeforcesRating(userInfo.rating);
            setCodeforcesMaxRating(userInfo.maxRating);
            setCodeforcesRank(userInfo.rank);
            setCodeforcesContests(ratings.length);
          });
      }

      if (cc) {
        fetch(`https://competeapi.vercel.app/user/codechef/${cc}`)
          .then((res) => res.json())
          .then((data) => {
            setCodechefRating(data.rating_number);
            setCodechefMaxRating(data.max_rank);
            setCodechefStars(data.rating);
            setCodechefCountryRank(data.country_rank || 0);
          });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="card h-auto w-min rounded-xl bg-gray-600 shadow-lg p-4 mb-8 text-white font-semibold font-mono flex">
          <h1>Coder: </h1>
          <h1 className="font-extrabold text-red-500">
            <u>{name}</u>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl">
          {/* LeetCode */}
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
                <h1 className="text-sm">{leetEasy}/880</h1>
              </div>
              <div className="bg-gray-500 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-orange-400 text-base">Medium</h1>
                <h1 className="text-sm">{leetMedium}/1920</h1>
              </div>
              <div className="bg-gray-500 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-red-600 text-base">Hard</h1>
                <h1 className="text-sm">{leetHard}/780</h1>
              </div>
            </div>
          </div>

          {/* Codeforces */}
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
                <h1 className="text-sm">{codeforcesContests}</h1>
              </div>
              <div className="bg-blue-700 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-blue-300 text-base">Max Rating</h1>
                <h1 className="text-sm">{codeforcesMaxRating}</h1>
              </div>
              <div className="bg-blue-700 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-indigo-300 text-base">Rank</h1>
                <h1 className="text-xs capitalize">{codeforcesRank}</h1>
              </div>
            </div>
          </div>

          {/* CodeChef */}
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
                <h1 className="text-orange-300 text-base">Stars</h1>
                <h1 className="text-xs">{codechefStars}</h1>
              </div>
              <div className="bg-amber-700 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-amber-300 text-base">Max Rating</h1>
                <h1 className="text-sm">{codechefMaxRating}</h1>
              </div>
              <div className="bg-amber-700 p-4 text-lg rounded-xl flex flex-col items-center">
                <h1 className="text-yellow-300 text-base">Country Rank</h1>
                <h1 className="text-sm">{codechefCountryRank}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition-transform transform hover:scale-105"
          >
            🔁 Reset & Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
