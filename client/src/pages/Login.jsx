import React, { useState } from "react";

const Login = () => {
  const [current, setCurrent] = useState("Login");
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt:14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{current}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {current === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-1 border rounded-lg border-gray-800 "
          placeholder="Name"
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-1 border rounded-lg border-gray-800 "
        placeholder="youremail@gmail.com"
      />
      <input
        type="password"
        className="w-full px-3 py-1 border rounded-lg border-gray-800 "
        placeholder="password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {current === "Login" ? (
          <p
            onClick={() => setCurrent("Sign Up")}
            className="cursor-pointer border px-1 py-1 rounded-xl  border-red-800"
          >
            Create new Account
          </p>
        ) : (
          <p
            onClick={() => setCurrent("Login")}
            className="cursor-pointer border px-1 py-1 rounded-xl  border-green-600"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white rounded-xl font-light px-8 py-2 mt-4" >{current==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  );
};

export default Login;
