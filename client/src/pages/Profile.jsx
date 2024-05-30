import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updateuserScuccess,
  updateuserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { set } from "mongoose";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileuploaderror, setFileuploaderror] = useState(false);
  const [update, setupdate] = useState(false);

  const [formdata, setformdata] = useState({});
  const dispatch = useDispatch();
  //   console.log(formdata);

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  //for update diminish after 3 seconds
  useEffect(() => {
    if (update) {
      const timer = setTimeout(() => {
        setupdate(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [update]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
      },
      (error) => {
        setFileuploaderror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformdata({ ...formdata, avatar: downloadURL })
        );
      }
    );
  };
  console.log(formdata);
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateuserFailure(data.message));
        return;
      }
      dispatch(updateuserScuccess(data));
      setupdate(true);
    } catch (error) {
      dispatch(updateuserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={imageRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => imageRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer mt-2"
        />
        <p className="text-sm self-center">
          {fileuploaderror ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className=" rounded-lg p-3 border"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className=" rounded-lg p-3 border"
          defaultValue={currentUser.email}
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" rounded-lg p-3 border"
          id="username"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between ">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer mt-5"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer mt-5">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{update ? "Profile updated" : ""}</p>
    </div>
  );
}

export default Profile;
