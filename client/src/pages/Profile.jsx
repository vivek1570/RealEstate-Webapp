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
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileuploaderror, setFileuploaderror] = useState(false);
  const [update, setupdate] = useState(false);
  const [formdata, setformdata] = useState({});
  const [showListingError, setshowListingError] = useState(false);
  const [userListings, setuserListings] = useState([]);
  const [listbtn, setListbtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(formdata);
  //   console.log(userListings);

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

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserSuccess(error.message));
    }
  };
  const handleListing = async () => {
    try {
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setshowListingError(true);
        return;
      }
      setListbtn(!listbtn);
      setuserListings(data);
    } catch (error) {
      setshowListingError(true);
    }
  };

  const handleDeleteList = (id) => async () => {
    console.log("from handle Delete list");
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log("error deleting listing");
        return;
      }
      setuserListings(userListings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log("error deleting listing");
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
          className="bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80  text-white uppercase"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 text-center text-white uppercase"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between ">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer mt-5"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer mt-5"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{update ? "Profile updated" : ""}</p>
      <button
        onClick={handleListing}
        className="text-green-700 w-full bg-slate-300 rounded-lg p-3 hover:opacity-95 uppercase mt-5"
      >
        Show Listing
      </button>
      {showListingError && (
        <p className="text-red-700">Error showing listings</p>
      )}
      {listbtn && userListings && userListings.length === 0 && (
        <p className="text-center text-red-400">No listings found</p>
      )}
      {listbtn && userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 mt-5 flex justify-between items-center gap-3"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing-cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:undeline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p className="hover:underline">{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={handleDeleteList(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/edit-listing/${listing._id}`)}
                  className="text-green-700 uppercase"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
