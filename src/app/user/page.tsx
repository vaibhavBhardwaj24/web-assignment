"use client";
import React, { useEffect, useState } from "react";
import Graphs from "../component/graphs";
interface data {
  daily: Chart;
  monthly: Chart;
  allTime: { [key: string]: number };
}
interface Chart {
  chartData: DataPoint[];
  [key: string]: number | DataPoint[];
}

interface DataPoint {
  timestamp: string;
  count: number;
}
const Userpage: React.FC = () => {
  const [data, setData] = useState<data>();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const res = await fetch("/api/userData", { method: "GET" });
    const data = await res.json();
    setData(data.user);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" h-screen flex flex-col overflow-scroll bg-color800 text-white ">
      <h1 className="text-6xl font-bold p-6">Users Data</h1>
      <h2 className="text-color500 pl-6">Overview of User Activity</h2>
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

export default Userpage;
