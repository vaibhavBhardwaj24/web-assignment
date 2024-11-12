"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col md:justify-center  items-start gap-4 md:p-32 p-4 font-semibold text-4xl bg-color800 text-white">
      <Link
        href={"/user"}
        className="group flex items-center text-nowrap hover:bg-color700 md:w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        User Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>

      <Link
        href={"/content"}
        className="group flex items-center text-nowrap hover:bg-color700 md:w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        Content Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>

      <Link
        href={"/blockchain"}
        className="group flex items-center text-nowrap hover:bg-color700 md:w-1/2 p-2 duration-200 rounded-lg justify-between"
      >
        Blockchain Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>
      <Link
        href={"/engagement"}
        className="group flex items-center text-nowrap hover:bg-color700 md:w-1/2 w-full p-2 duration-200 rounded-lg justify-between"
      >
        Engagement Metrics
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-10" />
      </Link>
    </div>
  );
};

export default Page;
