// App.jsx
import React from "react";
import { Route, useNavigate, Routes } from "react-router-dom"; // Removed BrowserRouter
import RegistrationForm from "./componants/Register";
import UploadNumbers from "./componants/UploadNumbers";

function App() {
  const navigate = useNavigate(); // Corrected usage of useNavigate

  const handleRegistration = async (formData) => {
    console.log(
      `password: ${formData.password}, confirmPassword: ${formData.confirmPassword}`
    );

    try {
      console.log("Sending data:", JSON.stringify(formData));
      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/upload"); // Redirect to the upload page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Error connecting to the API.");
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="h-screen flex justify-center items-center bg-gray-900">
            <RegistrationForm onSubmit={handleRegistration} />
          </div>
        }
      />
      <Route path="/upload" element={<UploadNumbers />} />
    </Routes>
  );
}

export default App;
