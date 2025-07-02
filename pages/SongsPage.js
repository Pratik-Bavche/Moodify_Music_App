import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaArrowLeft, FaSpinner, FaMusic } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';
import styles from '../styles/SongsPage.module.css';
import songs from '../assets/songs';

const SongsPage = ({ isNightMode, onNightModeToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mood = location.state?.mood || 'Happy';
  const searchQuery = location.state?.searchQuery;
  const searchResults = location.state?.searchResults;
  const fromSearch = location.state?.fromSearch;
  const [songsList, setSongsList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
    
    if (fromSearch && searchResults) {
      // Display search results
      setSongsList(searchResults);
    } else {
      // Display mood-based songs
      const moodSongs = songs.filter(song => song.mood === mood);
      setSongsList(moodSongs);
    }
  }, [mood, fromSearch, searchResults]);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const handlePlaySong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setIsPlaying(false);
  };

  const handleNextSong = () => {
    if (songsList.length > 0) {
      setCurrentSongIndex((prev) => (prev + 1) % songsList.length);
    }
  };

  const handlePrevSong = () => {
    if (songsList.length > 0) {
      setCurrentSongIndex((prev) => (prev - 1 + songsList.length) % songsList.length);
    }
  };

  const toggleFavorite = (song) => {
    const songKey = `${song.title}-${song.artist}`;
    let newFavorites;
    
    if (favorites.includes(songKey)) {
      newFavorites = favorites.filter(fav => fav !== songKey);
    } else {
      newFavorites = [...favorites, songKey];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (song) => {
    const songKey = `${song.title}-${song.artist}`;
    return favorites.includes(songKey);
  };

  const currentSong = songsList[currentSongIndex];

  const getMoodColor = (moodName) => {
    const colors = {
      'Happy': '#ffb300',
      'Sad': '#1976d2',
      'Angry': '#d32f2f',
      'Tired': '#6d4c41',
      'Natural': '#90a4ae',
      'Excited': '#ff9800',
      'Relaxed': '#4caf50',
      'Romantic': '#e91e63',
      'Focused': '#3f51b5',
      'Party': '#ab47bc'
    };
    return colors[moodName] || '#764ba2';
  };

  if (songsList.length === 0) {
    return (
      <div className={`${styles.container} ${isNightMode ? styles.nightMode : ''}`}>
        <Header isNightMode={isNightMode} onNightModeToggle={onNightModeToggle} />
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>Loading {mood} songs...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isNightMode ? styles.nightMode : ''}`}>
      <Header isNightMode={isNightMode} onNightModeToggle={onNightModeToggle} />
      
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>
            <FaMusic style={{ color: '#764ba2', marginRight: '10px' }} />
            {fromSearch ? `Search Results for "${searchQuery}"` : `${mood} Songs`}
          </h1>
          <p className={styles.subtitle}>
            {songsList.length} song{songsList.length !== 1 ? 's' : ''} {fromSearch ? 'found' : `available for ${mood} mood`}
          </p>
        </div>

        {songsList.length > 0 && showPlayer && (
          <div className={styles.playerContainer}>
            <Player
              songs={songsList}
              currentIndex={currentSongIndex}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onNext={handleNextSong}
              onPrev={handlePrevSong}
              onClose={handleClosePlayer}
            />
          </div>
        )}

        {songsList.length === 0 ? (
          <div className={styles.emptyState}>
            <FaMusic size={80} color="#90a4ae" />
            <h2>No songs found</h2>
            <p>{fromSearch ? `No songs found for "${searchQuery}"` : `No songs available for ${mood} mood.`}</p>
            <motion.button
              className={styles.browseButton}
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Dashboard
            </motion.button>
          </div>
        ) : (
          <div className={styles.songsContainer}>
            <div className={styles.songsList}>
              {songsList.map((song, index) => (
                <motion.div
                  key={`${song.title}-${song.artist}`}
                  className={`${styles.songItem} ${currentSongIndex === index && isPlaying ? styles.playing : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.songInfo}>
                    <div className={styles.songTitle}>{song.title}</div>
                    <div className={styles.songArtist}>{song.artist}</div>
                    <div className={styles.songMood}>{song.mood}</div>
                  </div>
                  
                  <div className={styles.songActions}>
                    <motion.button
                      className={styles.playButton}
                      onClick={() => handlePlaySong(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {currentSongIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                    </motion.button>
                    
                    <motion.button
                      className={`${styles.favoriteButton} ${isFavorite(song) ? styles.favorited : ''}`}
                      onClick={() => toggleFavorite(song)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={isFavorite(song) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <FaHeart />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      <Footer isNightMode={isNightMode} />
    </div>
  );
};

export default SongsPage; 