"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { FaCode } from "react-icons/fa";
import Footer from "./components/Footer";

export default function Index() {
  const [name, setName] = useState("");
  const [leetques, setLeetques] = useState("");
  const [codeforcesRating, setCodeforcesRating] = useState("");
  const [codechefRating, setCodechefRating] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Username is required";
    if (!leetques.trim()) newErrors.leetques = "LeetCode ID is required";
    if (!codeforcesRating.trim())
      newErrors.codeforcesRating = "Codeforces ID is required";
    if (!codechefRating.trim())
      newErrors.codechefRating = "CodeChef ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      name: name.trim(),
      leetcode: leetques.trim(),
      codeforces: codeforcesRating.trim(),
      codechef: codechefRating.trim(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "/profile";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8 w-full max-w-md"
          noValidate
        >
          <div className="flex items-center justify-center mb-6 space-x-2">
            <h2 className="text-2xl font-bold text-white text-center">
              CodeMate
            </h2>
            <FaCode className="text-orange-500 text-2xl" />
          </div>

          {[
            { id: "name", label: "Username", value: name, setValue: setName },
            {
              id: "leetques",
              label: "LeetCode ID",
              value: leetques,
              setValue: setLeetques,
            },
            {
              id: "codeforcesRating",
              label: "Codeforces ID",
              value: codeforcesRating,
              setValue: setCodeforcesRating,
            },
            {
              id: "codechefRating",
              label: "CodeChef ID",
              value: codechefRating,
              setValue: setCodechefRating,
            },
          ].map(({ id, label, value, setValue }) => (
            <div className="mb-4" key={id}>
              <label
                htmlFor={id}
                className="block text-white text-sm font-bold mb-2"
              >
                {label}:
              </label>
              <input
                type="text"
                id={id}
                required
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors[id] ? "border-red-500" : ""
                }`}
                placeholder={`Enter your ${label}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {errors[id] && (
                <p className="text-red-500 text-xs italic mt-1">{errors[id]}</p>
              )}
            </div>
          ))}

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
              type="submit"
            >
              Let&apos;s Go!!
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
}
