import React, { useState } from 'react'


export default function UploadNumbers() {

    const [numbers, setNumbers] = useState("");

    const handleChange = (e) => {
      setNumbers(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Numbers:", numbers);
      // Handle the list upload logic here
    };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
    <div className="p-6 bg-white rounded shadow-md w-96">
      <h1 className="text-2xl font-semibold text-center mb-4">Upload Numbers</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Enter Numbers (comma-separated)</label>
          <input
            type="text"
            value={numbers}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Upload
        </button>
      </form>
    </div>
  </div>
  )
}
