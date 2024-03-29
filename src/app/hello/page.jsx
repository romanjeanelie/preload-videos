"use client";
import React from "react";
import { useEffect, useRef } from "react";

const Video = ({ src }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && window.preloadedVideos && window.preloadedVideos[src]) {
      videoRef.current.src = URL.createObjectURL(window.preloadedVideos[src]);
    }
  }, []);
  return (
    <video ref={videoRef} autoPlay loop muted style={{ width: "200px", height: "200px", objectFit: "cover" }}></video>
  );
};

function Page() {
  return (
    <div>
      <Video src="./videos/1.webm" />
      <Video src="./videos/2.webm" />
      <Video src="./videos/3.webm" />
      <Video src="./videos/4.webm" />
      <Video src="./videos/5.webm" />
      <Video src="./videos/6.webm" />
      <Video src="./videos/7.webm" />
      <Video src="./videos/8.webm" />
      <Video src="./videos/9.webm" />
      <Video src="./videos/10.webm" />
      <Video src="./videos/11.webm" />
      <Video src="./videos/12.webm" />
    </div>
  );
}

export default Page;
