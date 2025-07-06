"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [gridSize, setGridSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setLoading(true);
      setTimeout(() => {
        setGridSize({ width: window.innerWidth, height: window.innerHeight });
        setLoading(false);
      }, 500); // Wait for 500ms before updating the grid
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen bg-background text-foreground">
        <button
          className="absolute top-4 right-4 rounded bg-gray-200 p-2 z-15 dark:bg-gray-800"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {loading ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ) : (
          <FlickeringGrid
            className="absolute inset-0 z-0 h-100vh w-full rounded-lg"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={gridSize.height}
            width={gridSize.width}
          />
        )}
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-between p-24">
          <div className="mt-10 text-center">
            <h1 className="text-2xl font-bold">Flickering Grid Demo</h1>
            <p className="mt-2 text-gray-600">
              A flickering grid with rounded corners.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
