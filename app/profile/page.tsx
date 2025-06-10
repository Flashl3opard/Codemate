"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

interface SubmissionStat {
  difficulty: string;
  count: number;
}

interface LeetCodeAPIResponse {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: SubmissionStat[];
      };
    };
  };
}

interface CodeforcesUserInfo {
  rating: number;
  maxRating: number;
  rank: string;
}

interface CodeforcesAPIResponse
  extends Array<CodeforcesUserInfo | { ratings: any[] }> {}

interface CodechefAPIResponse {
  rating_number: number;
  max_rank: number;
  rating: string;
  country_rank: number;
}

export default function Profile() {
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
  const [codechefMaxRating, setCodechefMaxRating] = useState(0);
  const [codechefStars, setCodechefStars] = useState("Unrated");
  const [codechefCountryRank, setCodechefCountryRank] = useState(0);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.name) setName(userData.name);

      const { leetcode: leet, codeforces: cf, codechef: cc } = userData;

      // LeetCode
      if (leet) {
        fetch(`https://competeapi.vercel.app/user/leetcode/${leet}`)
          .then((res) => res.json())
          .then((data: LeetCodeAPIResponse) => {
            const stats = data.data.matchedUser.submitStats.acSubmissionNum;
            setLeetques(stats.find((s) => s.difficulty === "All")?.count || 0);
            setLeetEasy(stats.find((s) => s.difficulty === "Easy")?.count || 0);
            setLeetMedium(
              stats.find((s) => s.difficulty === "Medium")?.count || 0
            );
            setLeetHard(stats.find((s) => s.difficulty === "Hard")?.count || 0);
          });
      }

      // Codeforces
      if (cf) {
        fetch(`https://competeapi.vercel.app/user/codeforces/${cf}`)
          .then((res) => res.json())
          .then((data: CodeforcesAPIResponse) => {
            const userInfo = data[0] as CodeforcesUserInfo;
            const ratings = (data[1] as { ratings: any[] }).ratings || [];
            setCodeforcesRating(userInfo.rating);
            setCodeforcesMaxRating(userInfo.maxRating);
            setCodeforcesRank(userInfo.rank);
            setCodeforcesContests(ratings.length);
          });
      }

      // CodeChef
      if (cc) {
        fetch(`https://competeapi.vercel.app/user/codechef/${cc}`)
          .then((res) => res.json())
          .then((data: CodechefAPIResponse) => {
            setCodechefRating(data.rating_number);
            setCodechefMaxRating(data.max_rank);
            setCodechefStars(data.rating);
            setCodechefCountryRank(data.country_rank);
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
          {/* LeetCode Card */}
          <div className="bg-gray-800 w-96 rounded-2xl flex flex-row p-6 font-bold text-white shadow-xl">
            <div className="flex flex-col items-center bg-gray-700 p-4 rounded-xl flex-1">
              <h1 className="text-4xl text-purple-500">
                {leetques}
                <span className="text-xl">/3580</span>
              </h1>
              <h1 className="text-sm font-medium">✅Solved</h1>
              <div className="text-xs mt-2 text-purple-400 font-normal">
                LeetCode
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1 ml-4">
              <StatBox
                title="Easy"
                value={`${leetEasy}/880`}
                color="text-green-500"
              />
              <StatBox
                title="Medium"
                value={`${leetMedium}/1920`}
                color="text-orange-400"
              />
              <StatBox
                title="Hard"
                value={`${leetHard}/780`}
                color="text-red-600"
              />
            </div>
          </div>

          {/* Codeforces Card */}
          <div className="bg-blue-900 w-96 rounded-2xl flex flex-row p-6 font-bold text-white shadow-xl">
            <div className="flex flex-col items-center bg-blue-800 p-4 rounded-xl flex-1">
              <h1 className="text-4xl text-blue-300">{codeforcesRating}</h1>
              <h1 className="text-sm font-medium">⭐Rating</h1>
              <div className="text-xs mt-2 text-blue-400 font-normal">
                Codeforces
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1 ml-4">
              <StatBox
                title="Contests"
                value={codeforcesContests}
                color="text-cyan-300"
              />
              <StatBox
                title="Max Rating"
                value={codeforcesMaxRating}
                color="text-blue-300"
              />
              <StatBox
                title="Rank"
                value={codeforcesRank}
                color="text-indigo-300"
              />
            </div>
          </div>

          {/* CodeChef Card */}
          <div className="bg-amber-900 w-96 rounded-2xl flex flex-row p-6 font-bold text-white shadow-xl">
            <div className="flex flex-col items-center bg-amber-800 p-4 rounded-xl flex-1">
              <h1 className="text-4xl text-amber-300">{codechefRating}</h1>
              <h1 className="text-sm font-medium">🏆Rating</h1>
              <div className="text-xs mt-2 text-amber-400 font-normal">
                CodeChef
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1 ml-4">
              <StatBox
                title="Stars"
                value={codechefStars}
                color="text-orange-300"
              />
              <StatBox
                title="Max Rating"
                value={codechefMaxRating}
                color="text-amber-300"
              />
              <StatBox
                title="Country Rank"
                value={codechefCountryRank}
                color="text-yellow-300"
              />
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
            🔁 Reset &amp; Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-opacity-50 bg-black p-4 text-lg rounded-xl flex flex-col items-center">
      <h1 className={`${color} text-base`}>{title}</h1>
      <h1 className="text-sm">{value}</h1>
    </div>
  );
}
