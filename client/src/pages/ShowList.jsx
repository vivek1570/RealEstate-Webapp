import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function ShowList() {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/list/${id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchList();
  }, [id]);

  return (
    <main>
      {loading && (
        <h1 className="text-center text-2xl my-7 font:semibold">Loading...</h1>
      )}
      {error && (
        <div>
          <h1 className="text-center text-2xl my-7 font:semibold">
            Somthing get wrong...
          </h1>
          <Link to={"/"}>
            <h1 className="hover:underline text-center text-2xl my-10 font:semibold">
              Go to main page
            </h1>
          </Link>
        </div>
      )}
      {listing && !error && !loading && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => {
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
        </>
      )}
    </main>
  );
}

export default ShowList;
