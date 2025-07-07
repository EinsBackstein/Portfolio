"use client";

import { useState } from "react";

import DotGrid from "@/components/DotGrid";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen bg-background text-foreground">
        <button
          className="absolute top-4 right-4 rounded bg-gray-200 p-2 z-15 dark:bg-gray-800"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="absolute inset-0 z-0">
          <DotGrid />
        </div>
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-between p-24">
          <div className="mt-10 text-center">
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <p className="mt-2 text-gray-600">
              My personal portfolio showcasing my projects and skills.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
