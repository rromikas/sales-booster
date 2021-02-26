import React from "react";

const Overview = ({ setPage }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-4xl font-bold">Overview</div>
        <div
          onClick={() => setPage(1)}
          className="rounded-xl px-10 py-3 text-white font-bold bg-gray-600 cursor-pointer hover:bg-gray-601 active:bg-gray-602 transition select-none"
        >
          Add a New Show
        </div>
      </div>
      <div className="flex">{}</div>
    </div>
  );
};

export default Overview;
