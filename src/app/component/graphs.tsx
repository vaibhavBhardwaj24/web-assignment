"use client";
import { BarChart3, LineChartIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface data {
  daily: chart;
  monthly: chart;
  allTime: [];
}
interface chart {
  chartData: [];
}
interface DataPoint {
  timestamp: string;
  count: number;
}

const Graphs = ({ data }: { data: data }) => {
  const [dailyToggle, setDailyToggle] = useState(true);
  const [monthlyToggle, setMonthlyToggle] = useState(true);
  const dailyData = [...data.daily.chartData].sort(
    (a: DataPoint, b: DataPoint): number =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const monthlyData = [...data.monthly.chartData].sort(
    (a: DataPoint, b: DataPoint): number =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const monthlyFormat = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  const dailyFormat = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="p-3 flex flex-col w-full">
      <div className="w-full h-fit p-4 flex flex-col gap-3 text-md md:text-3xl  ">
        <h1 className="font-bold">All Time Data</h1>
        <div className="grid gap-4 grid-cols-2 ">
          {Object.entries(data!.allTime).map(([key, value], index) => (
            <div
              key={index}
              className="font-semibold md:flex gap-3 bg-white rounded-lg p-4 hover:-translate-y-2 duration-200 cursor-pointer"
            >
              <p className="text-nowrap"> {splitCamelCase(key)}</p>
              <Count targetValue={value} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/2 flex gap-2 md:flex-row flex-col w-full">
        <div className="h-fit md:w-1/2 p-2 bg-white rounded-lg md:m-4">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-3xl">Daily Data</h1>
            <div className="bg-gray-200 flex gap-2 p-1 rounded-xl">
              <button
                style={{ backgroundColor: dailyToggle ? "white" : "" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setDailyToggle(true);
                }}
              >
                <LineChartIcon />
              </button>
              <button
                style={{ backgroundColor: dailyToggle ? "" : "white" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setDailyToggle(false);
                }}
              >
                <BarChart3 />
              </button>
            </div>
          </div>
          <div className="h-80">
            {dailyToggle ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={dailyFormat}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => dailyFormat(value)}
                    formatter={(value) => [`${value} counts`, "Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#E57373"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    hide
                    dataKey="timestamp"
                    tickFormatter={dailyFormat}
                    angle={-70}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => dailyFormat(value)}
                    formatter={(value: number) => [`${value} counts`, "Value"]}
                  />
                  <Bar
                    dataKey="count"
                    fill="#E57373"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 p-2 text-xl md:text-2xl">
            {Object.entries(data!.daily).map(([key, value], index) => {
              if (key === "chartData") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="font-semibold flex gap-3 bg-white rounded-lg "
                >
                  <p className="text-nowrap"> {splitCamelCase(key)}</p>
                  <Count targetValue={value} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-fit md:w-1/2 p-2 bg-white rounded-lg md:m-4">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-3xl">Monthly Data</h1>
            <div className="bg-gray-200 flex gap-2 p-1 rounded-xl">
              <button
                style={{ backgroundColor: monthlyToggle ? "white" : "" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setMonthlyToggle(true);
                }}
              >
                <LineChartIcon />
              </button>
              <button
                style={{ backgroundColor: monthlyToggle ? "" : "white" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setMonthlyToggle(false);
                }}
              >
                <BarChart3 />
              </button>
            </div>
          </div>
          <div className="h-80">
            {monthlyToggle ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={monthlyFormat}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => monthlyFormat(value)}
                    formatter={(value) => [`${value} counts`, "Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    hide
                    dataKey="timestamp"
                    tickFormatter={monthlyFormat}
                    angle={-70}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => monthlyFormat(value)}
                    formatter={(value: number) => [`${value} counts`, "Value"]}
                  />
                  <Bar
                    dataKey="count"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 p-2 text-xl md:text-2xl">
            {Object.entries(data!.monthly).map(([key, value], index) => {
              if (key === "chartData") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="font-semibold flex gap-3 bg-white rounded-lg "
                >
                  <p className="text-nowrap"> {splitCamelCase(key)}</p>
                  <Count targetValue={value} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;

function splitCamelCase(word: string) {
  let result = "";
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (i == 0) {
      result += char.toUpperCase();
      continue;
    }
    if (char === char.toUpperCase() && i !== 0) {
      result += " ";
    }
    result += char;
  }
  return result;
}
interface CountUpProps {
  targetValue?: number;
  duration?: number;
  className?: string;
  formatNumber?: boolean;
}

const Count: React.FC<CountUpProps> = ({
  targetValue = 1000,
  duration = 1000,
  formatNumber = true,
}) => {
  const [count, setCount] = useState<number>(0);

  type EasingFunction = (t: number) => number;

  const easeOut: EasingFunction = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const formatWithCommas = useCallback(
    (value: number): string => {
      return formatNumber ? value.toLocaleString() : value.toString();
    },
    [formatNumber]
  );

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress: number = timestamp - startTime;

      if (progress < duration) {
        const easedProgress: number = easeOut(progress / duration);
        setCount(Math.round(easedProgress * targetValue));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, easeOut]);

  return (
    <div
      className="text-3 xl font-bold text-black"
      role="timer"
      aria-live="polite"
    >
      {formatWithCommas(count)}
    </div>
  );
};
