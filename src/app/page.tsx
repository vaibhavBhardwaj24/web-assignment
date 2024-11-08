"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-start gap-4 p-32 font-semibold text-4xl bg-gray-200">
      <Link
        href={"/user"}
        className="group flex items-center hover:bg-white w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        User Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>

      <Link
        href={"/user"}
        className="group flex items-center hover:bg-white w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        Content Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>

      <Link
        href={"/user"}
        className="group flex items-center hover:bg-white w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        Blockchain Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>
      <Link
        href={"/user"}
        className="group flex items-center hover:bg-white w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        Engagement Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>
    </div>
  );
};

export default Page;
