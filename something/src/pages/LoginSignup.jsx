import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { FaFacebook, FaGoogle } from "react-icons/fa";
import axios from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    username: "",
    gender: "Male",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // React Router navigation hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      try {
        const { email, phone, password } = formData;

        // Fetch users from JSON Server
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        // Check if a user exists with matching email/phone and password
        const user = users.find(
          (user) =>
            (user.email === email || user.phone === phone) &&
            user.password === password
        );

        if (user) {
          // alert("Login successful!");
          navigate("/"); // Redirect to the home page
        } else {
          alert("Invalid email/phone or password.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again.");
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // Save user data to JSON Server
        await axios.post("http://localhost:3000/users", {
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          username: formData.username,
          gender: formData.gender,
        });

        alert("Signup successful!");
        setFormData({
          email: "",
          phone: "",
          password: "",
          username: "",
          gender: "Male",
          confirmPassword: "",
        }); // Reset the form
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white w-[400px] p-6 rounded-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={() => alert("Close modal!")}
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`text-lg font-semibold ${
              isLogin ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>
          <button
            className={`text-lg font-semibold ${
              !isLogin ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          {isLogin ? (
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email or Phone"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email Address"
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </>
          )}

          {/* Username */}
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="User Name"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password (6-16 characters)"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          {/* Confirm Password */}
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          )}

          {/* Gender */}
          {!isLogin && (
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                    formData.gender === "Male" ? "bg-cyan-500" : "bg-transparent"
                  }`}
                ></span>
                <span className="ml-2 text-sm">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                    formData.gender === "Female"
                      ? "bg-cyan-500"
                      : "bg-transparent"
                  }`}
                ></span>
                <span className="ml-2 text-sm">Female</span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button className="w-full bg-cyan-500 text-black py-2 rounded-md font-semibold mt-4 hover:bg-cyan-400">
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        {/* Social Media */}
        <div className="flex justify-center mt-4 space-x-6">
          <FaFacebook className="text-blue-500 text-2xl hover:scale-110 transition" />
          <FaGoogle className="text-red-500 text-2xl hover:scale-110 transition" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
