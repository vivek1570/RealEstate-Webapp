import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  const handleclick = () => {
    console.log("hello");
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex  flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
          Submit
        </button>
        <button
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
          onClick={handleclick}
        >
          Continue With Google
        </button>
        <div className="flex flex-row gap-2 mt-5">
          <p>Dont have a account?</p>
          <Link to="/sign-in">
            <p className="text-blue-600">Sign up</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
