import React, { useState } from "react";
import axios from "axios";

export default function UploadNumbers() {
  const [numbers, setNumbers] = useState("");
  const [algorithm, setAlgorithm] = useState("select");
  const [results, setResults] = useState([]);
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");

  const handleChangeNumbers = (e) => {
    setNumbers(e.target.value);
  };

  const handleChangeAlgorithm = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults([]);
    setMethod("");
    setTime("");

    const numberList = numbers.split(" ").map(Number); // Split by space and convert to numbers

    if (algorithm === "select") {
      alert("Please select a sorting algorithm");
      return;
    }

    try {
      const response = await axios.post("/api/sort", {
        method: algorithm,
        arr: numberList,
      });
      console.log("Response:", response.data);
      setMethod(response.data.Method);
      setResults(response.data.array);
      setTime(response.data.time);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Upload Numbers
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">
              Enter Numbers (space-separated)
            </label>
            <input
              type="text"
              value={numbers}
              onChange={handleChangeNumbers}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Select Algorithm</label>
            <select
              value={algorithm}
              onChange={handleChangeAlgorithm}
              className="w-full p-2 border rounded"
              required
            >
              <option value="select">Select</option>
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="selectionsort">Selection Sort</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </form>

        {results.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Method:</h2>
            <p>{method}</p>
            <h2 className="text-xl font-semibold">Time:</h2>
            <p> {time}</p>
            <h2 className="text-xl font-semibold">Sorted Numbers:</h2>
            <p className="text-gray-700">{results.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
