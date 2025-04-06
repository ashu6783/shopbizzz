import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Leaf, Mail, Lock, User, LogIn } from 'lucide-react';

const Login = () => {
  const [current, setCurrent] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (current === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Welcome to our eco-community!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Logged in sustainably!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, [setToken, token]);

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-black rounded-tl-3xl rounded-tr-3xl min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-emerald-100 flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Leaf size={24} className="text-emerald-600" />
          <p className="text-3xl font-semibold text-emerald-700">
            {current === "Login" ? "Eco Login" : "Join Our Green Community"}
          </p>
        </div>

        {/* Name Field (Sign Up Only) */}
        {current === "Sign Up" && (
          <div className="w-full relative">
            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your Name"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full relative">
          <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="youremail@gmail.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full relative">
          <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Password"
            required
          />
        </div>

        {/* Links */}
        <div className="w-full flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-emerald-600 transition-colors">
            Forgot your password?
          </p>
          {current === "Login" ? (
            <p
              onClick={() => setCurrent("Sign Up")}
              className="cursor-pointer text-emerald-600 hover:underline flex items-center gap-1"
            >
              <User size={16} />
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrent("Login")}
              className="cursor-pointer text-emerald-600 hover:underline flex items-center gap-1"
            >
              <LogIn size={16} />
              Login Here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all mt-4 w-full"
        >
          <Leaf size={20} />
          {current === "Login" ? "Sign In" : "Sign Up"}
        </button>

        {/* Eco Note */}
        <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
          <Leaf size={14} className="text-emerald-600" />
          Join us in making a greener impact
        </p>
      </form>
    </div>
  );
};

export default Login;