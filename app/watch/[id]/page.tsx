'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function WatchPage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([1]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Mock video data
  const videoData = {
    id: params.id,
    title: 'Sample Movie Title',
    description: 'This is a sample movie description that would normally come from your database.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'movie',
    year: 2024,
    rating: 'PG-13',
    duration: '2h 15m',
  };

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'tl', name: 'Filipino' },
    { code: 'de', name: 'German' },
  ];

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress([progressPercent]);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume;
    setVolume([newVolume]);

    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
      video.muted = true;
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setProgress(value);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlaybackSpeedChange = (speed: string) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = parseFloat(speed);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-white">{videoData.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>{videoData.year}</span>
              <span>•</span>
              <span>{videoData.rating}</span>
              <span>•</span>
              <span>{videoData.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div
        className="relative w-full h-screen bg-black group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseMove={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoData.videoUrl}
          poster={videoData.thumbnail}
          onClick={togglePlay}
        />

        {/* Video Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={progress}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-300 mt-1">
              <span>{formatTime((progress[0] / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.1}
                  className="w-24"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Caption Language Selector */}
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Settings */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 bg-black/90 border-gray-700">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Playback Speed</label>
                      <Select onValueChange={handlePlaybackSpeedChange} defaultValue="1">
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {playbackSpeeds.map((speed) => (
                            <SelectItem key={speed} value={speed.toString()}>
                              {speed === 1 ? 'Normal' : `${speed}x`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`transition-opacity duration-300 ${
              showControls ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {!isPlaying && (
              <div className="bg-black/50 rounded-full p-6 pointer-events-auto cursor-pointer" onClick={togglePlay}>
                <Play className="h-12 w-12 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-20 left-6 max-w-md z-40">
        <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-300 text-sm leading-relaxed">
            {videoData.description}
          </p>
        </div>
      </div>
    </div>
  );
}