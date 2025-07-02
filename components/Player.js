import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaTimes, FaStepForward, FaStepBackward } from 'react-icons/fa';
import styles from '../styles/Player.module.css';
import { motion } from 'framer-motion';

const formatTime = (sec) => {
  if (!sec) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const Player = ({ songs, currentIndex, onPlay, onPause, isPlaying, onSeek, showQueue, onClose, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const song = songs[currentIndex];

  // Sync play/pause and song changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsLoading(true);
        setError(null);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Audio playback error:', error);
              setError('Failed to play audio. Please try again.');
              setIsLoading(false);
              onPause();
            });
        }
      } else {
        audioRef.current.pause();
        setIsLoading(false);
      }
    }
  }, [isPlaying, song, onPause]);

  useEffect(() => {
    if (audioRef.current) {
      setCurrentTime(0);
      setDuration(audioRef.current.duration || 0);
      setError(null);
    }
  }, [song]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
    if (onSeek) {
      onSeek(audioRef.current.currentTime, audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleAudioLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleAudioCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleAudioError = (e) => {
    console.error('Audio error:', e);
    setError('Failed to load audio. Please try another song.');
    setIsLoading(false);
    onPause();
  };

  return (
    <div className={styles.playerWrap}>
      <button className={styles.closeBtn} onClick={onClose} title="Close Player">
        <FaTimes />
      </button>
      <img src={song.albumArt} alt={song.title} className={styles.albumArtSmall} />
      <div className={styles.songInfo}>
        <div className={styles.songTitle}>{song.title}</div>
        <div className={styles.songArtist}>{song.artist}</div>
        {error && (
          <div className={styles.errorMessage} style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '4px' }}>
            {error}
          </div>
        )}
        <div className={styles.progressRow}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className={styles.progressBar}
            disabled={isLoading}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
        {showQueue && (
          <div className={styles.queueIndicator}>
            {currentIndex + 1} / {songs.length}
          </div>
        )}
      </div>
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onPause}
        onLoadStart={handleAudioLoadStart}
        onCanPlay={handleAudioCanPlay}
        onError={handleAudioError}
        preload="auto"
      />
      <div className={styles.controls}>
        <button className={styles.ctrlBtn} onClick={onPrev} disabled={isLoading}>
          <FaStepBackward />
        </button>
        <button className={styles.ctrlBtn} onClick={handlePlayPause} disabled={isLoading}>
          {isLoading ? (
            <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          ) : isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>
        <button className={styles.ctrlBtn} onClick={onNext} disabled={isLoading}>
          <FaStepForward />
        </button>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Player; 