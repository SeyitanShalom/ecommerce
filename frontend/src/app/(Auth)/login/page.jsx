"use client";
import React, { useState } from "react";

const page = () => {
  const [auth, setAuth] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Logging in", formData);
    let responseData = null;

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json", // Correct this
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      responseData = await res.json();

      if (!res.ok) {
        console.error(
          "Registration failed:",
          responseData.message || responseData
        );
        alert(
          "Registration failed: " + (responseData.message || "Unknown error")
        );
        return;
      }

      if (responseData.success && typeof window !== "undefined") {
        localStorage.setItem("auth-token", responseData.token);
        window.location.href = "/"; // <-- fixed
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const register = async () => {
    console.log("Signing up", formData);

    let responseData = null;

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          Accept: "application/json", // Correct this
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      responseData = await res.json();

      if (!res.ok) {
        console.error(
          "Registration failed:",
          responseData.message || responseData
        );
        alert(
          "Registration failed: " + (responseData.message || "Unknown error")
        );
        return;
      }

      if (responseData.success && typeof window !== "undefined") {
        localStorage.setItem("auth-token", responseData.token);
        window.location.href = "/"; // <-- fixed
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full h-[700px] flex items-center justify-center bg-purple-200">
      <div className=" p-10 m-5 bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900">{auth}</h2>
        <div className="flex flex-col mt-5 mb-7  w-full">
          {auth === "Sign Up" ? (
            <input
              onChange={handleChange}
              value={formData.name}
              type="text"
              name="name"
              id="name"
              placeholder="Name..."
              className="border-b-2 border-gray-300 p-2 outline-none mb-7 "
            />
          ) : (
            <></>
          )}

          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address... "
            className="border-b-2 border-gray-300 p-2 outline-none mb-7"
          />

          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password... "
            className="border-b-2 border-gray-300 p-2 outline-none"
          />
        </div>
        <button
          className="text-center w-full bg-purple-500 text-white font-bold py-3 rounded-sm hover:cursor-pointer"
          onClick={() => {
            auth === "Login" ? login() : register();
          }}
        >
          Continue
        </button>
        {auth === "Login" ? (
          <p className="my-5 text-sm font-semibold text-gray-800">
            Don't have an account?{" "}
            <span
              className="text-purple-500 font-bold hover:cursor-pointer"
              onClick={() => setAuth("Sign Up")}
            >
              Register Here
            </span>
          </p>
        ) : (
          <p className="my-5 text-sm font-semibold text-gray-800">
            Already have an account?{" "}
            <span
              className="text-purple-500 font-bold hover:cursor-pointer"
              onClick={() => setAuth("Login")}
            >
              Login Here
            </span>
          </p>
        )}
        <div className="flex items-center gap-3">
          <input type="checkbox" className="translate-y-[1px]" />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{" "}
            <span className="underline">terms of use</span> &{" "}
            <span className="underline">privacy policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
