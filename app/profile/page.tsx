"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface PlatformData {
  status: string;
  data?: Record<string, unknown>;
  message?: string;
}

interface UserData {
  username: string;
  leetcode?: Record<string, unknown>;
  codeforces?: Record<string, unknown>;
  codechef?: Record<string, unknown>;
}

export default function ProfilePage() {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (!storedData) {
      setError("No user data found.");
      return;
    }

    const userData = JSON.parse(storedData);
    const { name, leetcode, codeforces, codechef } = userData;

    const fetchPlatformData = async (
      platform: string,
      username: string
    ): Promise<PlatformData> => {
      try {
        const res = await fetch(
          `https://competeapi.vercel.app/user/${platform}/${username}`
        );
        return await res.json();
      } catch {
        return { status: "error", message: `Failed to fetch ${platform}` };
      }
    };

    Promise.all([
      fetchPlatformData("leetcode", leetcode),
      fetchPlatformData("codeforces", codeforces),
      fetchPlatformData("codechef", codechef),
    ]).then(([leetRes, cfRes, ccRes]) => {
      const failed: string[] = [];

      if (leetRes.status !== "success") failed.push("LeetCode");
      if (cfRes.status !== "success") failed.push("Codeforces");
      if (ccRes.status !== "success") failed.push("CodeChef");

      if (failed.length) {
        setError(`Failed to fetch data from: ${failed.join(", ")}`);
        return;
      }

      setData({
        username: name,
        leetcode: leetRes.data,
        codeforces: cfRes.data,
        codechef: ccRes.data,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : !data ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LeetCode */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-orange-400">
                LeetCode
              </h2>
              {data.leetcode ? (
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(data.leetcode, null, 2)}
                </pre>
              ) : (
                <p>No data available.</p>
              )}
            </div>

            {/* Codeforces */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-blue-400">
                Codeforces
              </h2>
              {data.codeforces ? (
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(data.codeforces, null, 2)}
                </pre>
              ) : (
                <p>No data available.</p>
              )}
            </div>

            {/* CodeChef */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-2 text-purple-400">
                CodeChef
              </h2>
              {data.codechef ? (
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(data.codechef, null, 2)}
                </pre>
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
