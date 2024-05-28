import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-2"
        />
        <input
          type="text"
          placeholder="username"
          className=" rounded-lg p-3 border"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className=" rounded-lg p-3 border"
          id="username"
        />
        <input
          type="text"
          placeholder="password"
          className=" rounded-lg p-3 border"
          id="username"
        />
        <button className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between ">
        <span className="text-red-700 cursor-pointer mt-2">Delete Account</span>
        <span className="text-red-700 cursor-pointer mt-2">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
