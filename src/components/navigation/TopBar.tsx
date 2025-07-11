"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { main } from "framer-motion/client";
import { useTheme } from "next-themes";

const ACCENT_COLOR_DARK = "60,204,65";
const ACCENT_COLOR_LIGHT = "1,90,223"; 
const TopBar = () => {
  const { theme } = useTheme();
  const textColor = theme === "light" ? "black" : "white";

  return (
    <main className="flex items-center justify-between p-4 bg-background" style={{ color: textColor }}>
      <div className="flex-1 text-left">
        {/* Left Part - Sidebar Module */}
      </div>
      <div className="flex-1 text-center">
        {/* Center Part */}
        {/* Logo comes here later */}
        <h1
          className="font-bold text-2xl"
          style={{
            background: `linear-gradient(to right, rgb(${ACCENT_COLOR_DARK}), rgb(${ACCENT_COLOR_LIGHT}))`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          UNDER CONSTRUCTION
        </h1>
      </div>
      <div className="flex-1 text-right space-x-4">
        {/* Right Part - Navigation Links */}
        <Link href="/">Skills</Link>
        <Link href="/">Roadmap</Link>
        <Link href="/">About Me</Link>
        <Link href="/">Contact</Link>
      </div>
    </main>
  );
};

export default TopBar;