"use client";
import {
  User,
  FileText,
  Blocks,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const menuItems = [
    { name: "User", icon: User, path: "/user" },
    { name: "Content", icon: FileText, path: "/content" },
    { name: "Blockchain", icon: Blocks, path: "/blockchain" },
    { name: "Engagement", icon: BarChart2, path: "/engagement" },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-14 "
      } h-screen bg-gray-900 z-20 text-white transition-all duration-300 absolute left-0 top-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {isExpanded && (
            <span className="text-lg font-semibold">Dashboard</span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <button
              //
              key={item.name}
              className={`md:w-full flex rounded-lg
               ${
                 pathname === item.path
                   ? "bg-gray-800 text-white"
                   : "text-gray-300 hover:bg-gray-800 hover:text-white"
               }`}
            >
              <Link
                href={item.path}
                className="flex   items-center gap-3 px-4 py-3  "
              >
                <item.icon className="h-5  w-5 shrink-0" />

                {isExpanded && (
                  <div className="text-sm  font-medium ">{item.name}</div>
                )}
              </Link>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <User className="h-5 w-5" />
            {isExpanded && <span className="text-sm font-medium">Profile</span>}
          </button>
        </div>
      </div>
    </div>
  );
}