import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signin() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log("if no error", data.message);
      if (data.success === false) {
        console.log("if error", data.message);
        setLoading(false);
        setError(data.message);
        return;
      }
      // handle successful signup
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handlesubmit} className="flex  flex-col gap-4 ">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex flex-row gap-2 mt-5">
        <p>Dont have a account?</p>
        <Link to="/sign-up">
          <p className="text-blue-600">Sign Up</p>
        </Link>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default Signin;
