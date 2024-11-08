"use client";
import React, { useEffect, useState } from "react";
import Graphs from "../component/graphs";

interface Data {
  daily: Chart;
  monthly: Chart;
  allTime: [];
}

interface Chart {
  chartData: [];
}

const BlockchainPage: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("/api/blockchainData", { method: "GET" });
    const data = await res.json();
    setData(data.user);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-screen overflow-scroll flex flex-col bg-gray-200">
      <h1 className="text-6xl font-bold p-6">Blockchain Metrics</h1>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center backdrop-blur-lg">
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className="animate-ping"
              ></svg>
            </div>
          </div>
        </div>
      ) : (
        <Graphs data={data!} />
      )}
    </div>
  );
};

export default BlockchainPage;