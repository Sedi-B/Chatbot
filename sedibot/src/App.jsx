import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const API = `http://localhost:3000/?prompt=${prompt}`;
  const [data, setData] = useState(null);
  const [convo, setConvo] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();

    if (prompt === "") {
      alert("Fill in the text area");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API, {
        method: "POST",
      });
      const data1 = await response.json();
      setData(data1);
      setPrompt("");
      setConvo([
        ...convo,
        { role: "user", message: prompt },
        { role: "ai", message: data1.data },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-slate-400 rounded-lg p-6 shadow-md h-5/6 w-[30%] relative">
        <div className="h-5/6 overflow-auto">
          {convo.map((message, index) => {
            const role = message.role;
            return (
              <p
                key={index}
                className={
                  role === "user"
                    ? "text-white bg-blue-500 rounded-lg py-3 px-3 w-3/4 my-3 "
                    : "text-white bg-gray-600 rounded-lg py-3 px-3 w-3/4 my-3"
                }
              >
                {message.message}
              </p>
            );
          })}
          {loading && (
            <p className="italic text-white bg-gray-600 rounded-lg py-4 px-3 w-3/4 my-3 self-start">
              Loading...
            </p>
          )}
        </div>
        <div className="flex items-center w-full my-3">
          <input
            className="outline-none w-full border border-blue-500 rounded px-2 py-2"
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Send message"
          />
          <button
            className="ml-2 bg-blue-500 text-white rounded px-4 py-1"
            onClick={fetchData}
          >
            <IoMdSend className="inline-block mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
