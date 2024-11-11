"use client";
import { BarChart3, LineChartIcon, Triangle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
              className="font-semibold md:flex gap-3  bg-color1 rounded-lg p-4 hover:-translate-y-2 duration-200 cursor-pointer border-[2px] border-color700"
            >
              <p className="text-wrap text-color500"> {splitCamelCase(key)}</p>
              <Count
                className="md:text-3xl text-2xl"
                percentage={0}
                targetValue={
                  typeof value === "number"
                    ? value
                    : parseInt(String(value), 10)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-1/2 flex gap-2 md:flex-row flex-col w-full">
        <div className="h-fit md:w-1/2 p-2 bg-color1 rounded-lg md:m-4">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-3xl">Daily Data</h1>
            <div className="bg-color700 flex gap-2 p-1 text-color200 rounded-xl">
              <button
                style={{ backgroundColor: dailyToggle ? "#6c72ff" : "" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setDailyToggle(true);
                }}
              >
                <LineChartIcon />
              </button>
              <button
                style={{ backgroundColor: dailyToggle ? "" : "#6c72ff" }}
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
                <AreaChart
                  data={dailyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E57373" stopOpacity={0.6} />
                      <stop
                        offset="95%"
                        stopColor="#E57373"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={dailyFormat}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis width={40} />
                  <Tooltip
                    labelFormatter={(value) => dailyFormat(value)}
                    formatter={(value) => [`${value} counts`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#E57373"
                    strokeWidth={2}
                    fill="url(#colorCount)"
                    // dot={{ r: 1 }}
                    // activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    hide
                    dataKey="timestamp"
                    tickFormatter={dailyFormat}
                    angle={-70}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis width={40} />
                  <Tooltip
                    labelFormatter={(value) => dailyFormat(value)}
                    formatter={(value: number) => [`${value} counts`, "Value"]}
                  />
                  <Bar
                    legendType="line"
                    dataKey="count"
                    fill="#E57373"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  ></Bar>
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 p-2 text-base md:text-2xl">
            {Object.entries(data!.daily).map(([key, value], index) => {
              if (key === "chartData") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="font-semibold items-center flex gap-3 rounded-lg md:justify-start justify-between "
                >
                  <div className="flex gap-2  items-center">
                    {" "}
                    <p className="text-nowrap text-base text-color500">
                      {splitCamelCase(key)}
                    </p>
                    <Count
                      targetValue={value as number}
                      percentage={Number(
                        (((value as number) -
                          (data.monthly[key] as number) / 31) /
                          ((data.monthly[key] as number) / 31)) *
                          100
                      )}
                    />
                  </div>
                  <p
                    className="text-xs flex gap-1 opacity-75"
                    style={{
                      color:
                        Number(
                          (((value as number) -
                            (data.monthly[key] as number) / 31) /
                            ((data.monthly[key] as number) / 31)) *
                            100
                        ) > 0
                          ? "#4CAF50"
                          : "#E57373",
                    }}
                  >
                    {Number(
                      (((value as number) -
                        (data.monthly[key] as number) / 31) /
                        ((data.monthly[key] as number) / 31)) *
                        100
                    ) < 0 ? (
                      <Triangle className="rotate-180 size-4 " fill="#FF6B6B" />
                    ) : (
                      <Triangle className=" size-4 " fill="#4CAF50" />
                    )}
                    {Number(
                      (((value as number) -
                        (data.monthly[key] as number) / 31) /
                        ((data.monthly[key] as number) / 31)) *
                        100
                    ).toFixed(0)}
                    % last month
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-fit md:w-1/2 p-2 bg-color1 rounded-lg md:m-4">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-3xl">Monthly Data</h1>
            <div className="bg-color700 flex gap-2 p-1 text-color200 rounded-xl">
              <button
                style={{ backgroundColor: monthlyToggle ? "#6c72ff" : "" }}
                className="rounded-lg p-1 duration-300"
                onClick={() => {
                  setMonthlyToggle(true);
                }}
              >
                <LineChartIcon />
              </button>
              <button
                style={{ backgroundColor: monthlyToggle ? "" : "#6c72ff" }}
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
                <AreaChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="monthColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6} />
                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={monthlyFormat}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis width={40} />
                  <Tooltip
                    labelFormatter={(value) => monthlyFormat(value)}
                    formatter={(value) => [`${value} counts`, "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#monthColor)"
                    // dot={false} {/* Removes the dot markers */}
                    // activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    hide
                    dataKey="timestamp"
                    tickFormatter={monthlyFormat}
                    angle={-70}
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis width={40} />
                  <Tooltip
                    labelFormatter={(value) => monthlyFormat(value)}
                    formatter={(value: number) => [`${value} counts`, "Value"]}
                  />
                  <Legend />
                  <Bar
                    legendType="line"
                    dataKey="count"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 p-2  md:text-2xl ">
            {Object.entries(data!.monthly).map(([key, value], index) => {
              if (key === "chartData") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="font-semibold flex gap-3 bg-color1 rounded-lg  items-center md:justify-start justify-between"
                >
                  <div className="flex gap-2 items-center">
                    <p className="text-nowrap text-base text-color500">
                      {splitCamelCase(key)}
                    </p>

                    <Count
                      targetValue={value as number}
                      percentage={Number(
                        (((value as number) - data.allTime[key] / 12) /
                          (data.allTime[key] / 12)) *
                          100
                      )}
                    />
                  </div>
                  <p
                    className="text-xs flex gap-1 opacity-75"
                    style={{
                      color:
                        Number(
                          (((value as number) - data.allTime[key] / 12) /
                            (data.allTime[key] / 12)) *
                            100
                        ) > 0
                          ? "#4CAF50"
                          : "#E57373",
                    }}
                  >
                    {Number(
                      (((value as number) - data.allTime[key] / 12) /
                        (data.allTime[key] / 12)) *
                        100
                    ) < 0 ? (
                      <Triangle className="rotate-180 size-4 " fill="#FF6B6B" />
                    ) : (
                      <Triangle className="size-4" fill="#4CAF50" />
                    )}
                    {Number(
                      (((value as number) - data.allTime[key] / 12) /
                        (data.allTime[key] / 12)) *
                        100
                    ).toFixed(0)}
                    % last year
                  </p>
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
  percentage: number;
}

const Count: React.FC<CountUpProps> = ({
  className = "",
  targetValue = 1000,
  duration = 1000,
  formatNumber = true,
  percentage = 0,
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
      className={`text-3xl font-bold text-white ${className}`}
      role="timer"
      aria-live="polite"
      style={{
        color:
          percentage === 0 ? "white" : percentage > 0 ? "green" : "#FF6B6B",
      }}
    >
      {formatWithCommas(count)}
    </div>
  );
};
