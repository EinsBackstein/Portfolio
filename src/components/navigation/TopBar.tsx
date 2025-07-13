"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { main } from "framer-motion/client";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, AlignJustify } from 'lucide-react';

const ACCENT_COLOR_DARK = "60,204,65";
const ACCENT_COLOR_LIGHT = "1,90,223"; 

interface TopBarProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ setSidebarOpen }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Delay hiding the tooltip to allow exit animation
    setTimeout(() => {
      setShowTooltip(false);
    }, 100); // Faster exit - half the duration
  };

  return (
    <main className="flex items-center justify-between p-4 bg-background font-[family-name:var(--font-manrope)] antialiased text-foreground">
      <div className="flex-1 text-left flex flex-row items-center space-x-4">
        {/* Left Part - Sidebar Module */}
        <AlignJustify className="h-7 w-7 cursor-pointer" onClick={() => setSidebarOpen(true)} />
        <div className="relative">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            disabled={!mounted}
            className="px-2 py-1 rounded flex items-center space-x-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {mounted
              ? resolvedTheme === "dark"
                ? <Sun className="w-6 h-6" style={{ color: "gold" }} />
                : <Moon className="w-6 h-6" style={{ color: "silver" }} />
              : "Loading Theme..."}
          </button>
          <AnimatePresence>
            {mounted && showTooltip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut" 
                }}
                className="absolute font-semibold top-full mt-2 px-2 py-1 bg-foreground text-background text-sm rounded shadow-lg whitespace-nowrap z-10 antialiased"
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              >
                Switch to {resolvedTheme === "dark" ? "Light" : "Dark"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex-1 text-center">
        {/* Center Part */}
        {/* Logo comes here later */}
        <h1
          className="text-2xl font-bold "
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