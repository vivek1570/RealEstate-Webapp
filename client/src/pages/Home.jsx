import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import estatepic from "../assets/images.js";
import { useEffect, useState } from "react";
import Listings from "../components/Listings.jsx";
import { Link } from "react-router-dom";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerData, setOfferData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [saleData, setSaleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/listing/get?offer=true&limit=4");
      const data = await res.json();
      setOfferData(data);
    };
    const fetchData1 = async () => {
      const res = await fetch("/api/listing/get?type=rent&limit=4");
      const data = await res.json();
      setRentData(data);
    };
    const fetchData2 = async () => {
      const res = await fetch("/api/listing/get?type=sale&limit=4");
      const data = await res.json();
      setSaleData(data);
    };
    fetchData1();
    fetchData2();
    fetchData();
  }, []);
  console.log(offerData);

  return (
    <div>
      {/* header section */}
      <div className="max-w-6xl mx-auto px-3 py-28">
        <div className="flex flex-col gap-6">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find Your Next <span className="text-slate-500">Perfect</span>{" "}
            <br />
            place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Vivek Estate will help you find your home fast, easy and
            comfortable.
            <br />
            Our expert support are always available.{" "}
          </div>
          <a className="text-blue-900 font-semibold" href="/search">
            Get Started...
          </a>
        </div>
      </div>
      {/* swiper section */}
      <Swiper navigation>
        {estatepic.imageUrls.map((url) => {
          return (
            <SwiperSlide key={url}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* List  section  for offer*/}
      <div className="max-w-6xl mx-auto px-3 py-20">
        <h1 className="text-slate-600 font-semibold text-2xl">Recent Offers</h1>
        <Link to={"/search?offer=true"}>
          <p className="mb-5 text-sm hover:underline text-blue-800">
            Show More offers...
          </p>
        </Link>
        <div className="flex flex-wrap gap-8">
          {offerData.map((listing) => (
            <Listings key={listing._id} listing={listing} />
          ))}
        </div>
      </div>

      {/* List  section  for type rent*/}

      <div className="max-w-6xl mx-auto px-3 py-20">
        <h1 className="text-slate-600 font-semibold text-2xl">
          Recent places for rent
        </h1>
        <Link to={"/search?type=rent"}>
          <p className="mb-5 text-sm hover:underline text-blue-800">
            Show more places for rent...
          </p>
        </Link>
        <div className="flex flex-wrap gap-8">
          {rentData.map((listing) => (
            <Listings key={listing._id} listing={listing} />
          ))}
        </div>
      </div>

      {/* List  section  for type sale*/}

      <div className="max-w-6xl mx-auto px-3 py-20">
        <h1 className="text-slate-600 font-semibold text-2xl">
          Recent places for sale
        </h1>
        <Link to={"/search?type=sale"}>
          <p className="mb-5 text-sm hover:underline text-blue-800">
            Show more places for sale...
          </p>
        </Link>
        <div className="flex flex-wrap gap-8">
          {saleData.map((listing) => (
            <Listings key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
