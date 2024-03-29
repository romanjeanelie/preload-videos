"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { preloadVideos } from "@/preloadVideos";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    preloadVideos({
      onComplete: () => console.log("preloaded"),
    });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
