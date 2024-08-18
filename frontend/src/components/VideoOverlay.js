"use client"
import { useEffect, useState } from 'react';

const VideoOverlay = ({ onVideoEnd }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById('intro-video');
    videoElement.play();
    videoElement.onended = () => {
      setIsPlaying(false);
      onVideoEnd();
    };
  }, [onVideoEnd]);

  return (
    isPlaying && (
      <div className="fixed inset-0 flex justify-center items-center" style={{ backgroundColor: '#000000' }}>
        <video
          id="intro-video"
          className="w-full h-auto max-w-4xl" 
          src="/intro.mp4"
          muted
        />
      </div>
    )
  );
};

export default VideoOverlay;

