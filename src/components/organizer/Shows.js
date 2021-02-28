import React, { useEffect, useState } from "react";
import ApiUrl from "apiUrl";
import AssetsUrlPrefix from "assetsUrlPrefix";

const getShowStatus = (show) => {
  if (new Date(show.start_date).getTime() < Date.now()) {
    return "Ended";
  }

  return "Open";
};

const Shows = ({ setPage }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await fetch(`${ApiUrl}/shows`).then((res) => res.json());
      console.log("shows", data);
      setShows(data);
    }

    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Shows</div>
        <div
          onClick={() => setPage(11)}
          className="rounded-xl px-10 py-3 text-white font-bold bg-gray-600 cursor-pointer hover:bg-gray-601 active:bg-gray-602 transition select-none"
        >
          Add a New Show
        </div>
      </div>
      <div className="flex flex-wrap py-14">
        {shows.map((x, i) => (
          <div
            style={{ width: 250 }}
            key={`show-${i}`}
            className="p-8 rounded-lg bg-gray-300 font-bold text-center mr-9 mb-9 text-sm"
          >
            <div
              className="mx-auto bg-center bg-cover w-20 h-20 mb-5"
              style={{ backgroundImage: `url(${AssetsUrlPrefix}${x.logo.url})` }}
            ></div>
            <div className="h-20">
              <div className="text-gray-500 mb-3 text-xs">Show Name</div>
              <div className="text-black-400 line-clamp-1">{x.name}</div>
            </div>
            <div className="mb-6">
              <div className="text-gray-500 mb-3 text-xs">Status</div>
              <div className="text-white bg-gray-500 uppercase inline-block mx-auto w-24 rounded">
                {getShowStatus(x)}
              </div>
            </div>
            <div className="transition rounded bg-gray-600 hover:bg-gray-601 active:bg-gray-602 py-2 text-center text-white cursor-pointer select-none">
              Edit Show
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
