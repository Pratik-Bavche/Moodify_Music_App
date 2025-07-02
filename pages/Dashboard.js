import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaMusic, FaHeart, FaSpinner, FaPlay, FaTimes, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';
import WebcamModal from '../components/WebcamModal';
import styles from '../styles/Dashboard.module.css';
import songs from '../assets/songs';

const Dashboard = ({ isNightMode, onNightModeToggle }) => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const moods = [
    { name: 'Happy', icon: '😊' },
    { name: 'Sad', icon: '😢' },
    { name: 'Angry', icon: '😠' },
    { name: 'Tired', icon: '😴' },
    { name: 'Natural', icon: '😐' },
    { name: 'Excited', icon: '🤩' },
    { name: 'Relaxed', icon: '😌' },
    { name: 'Romantic', icon: '🥰' },
    { name: 'Focused', icon: '🤓' },
    { name: 'Party', icon: '🎉' }
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const handleWebcamDetect = (mood) => {
    setSelectedMood(mood);
    handleMoodSelect(mood);
    setWebcamOpen(false);
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const moodSongs = songs.filter(song => song.mood === mood);
    setRecommendedSongs(moodSongs);
    setCurrentSongIndex(0);
    setIsPlaying(false);
  };

  const handleShowSongs = () => {
    navigate('/songs', { state: { mood: selectedMood } });
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
    if (recommendedSongs.length > 0) {
      setCurrentSongIndex((prev) => (prev + 1) % recommendedSongs.length);
    }
  };

  const handlePrevSong = () => {
    if (recommendedSongs.length > 0) {
      setCurrentSongIndex((prev) => (prev - 1 + recommendedSongs.length) % recommendedSongs.length);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Remove duplicates and get unique songs
    const uniqueSongs = songs.filter((song, index, self) => 
      index === self.findIndex(s => 
        s.title.toLowerCase() === song.title.toLowerCase() && 
        s.artist.toLowerCase() === song.artist.toLowerCase()
      )
    );
    
    // Filter by search query
    const results = uniqueSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleShowMore = () => {
    // Navigate to songs page with search results
    navigate('/songs', { 
      state: { 
        searchQuery: searchQuery,
        searchResults: searchResults,
        fromSearch: true
      } 
    });
  };

  const currentSong = recommendedSongs[currentSongIndex];

  return (
    <div className={`${styles.bgWrap} ${isNightMode ? styles.nightMode : ''}`}>
      <Header isNightMode={isNightMode} onNightModeToggle={onNightModeToggle} />
      <WebcamModal open={webcamOpen} onClose={() => setWebcamOpen(false)} onDetect={handleWebcamDetect} />
      
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <h1 className={styles.title}>Welcome to Moodify</h1>
        <p className={styles.subtitle}>How are you feeling today?</p>
        
        <div className={styles.optionsRow}>
          <motion.button
            className={styles.webcamBtn}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setWebcamOpen(true)}
          >
            <FaCamera size={28} style={{ marginRight: 10 }} />
            Auto Mood Detection
          </motion.button>
          
          <div className={styles.manualMoodBox}>
            <span className={styles.manualLabel}>Or select your mood:</span>
            <div className={styles.moodIcons}>
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  className={styles.moodBtn}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood.name)}
                  style={selectedMood === mood.name ? { border: '2px solid #764ba2', background: '#f3e5f5' } : {}}
                >
                  {mood.icon}
                  <span className={styles.moodName}>{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {selectedMood && (
          <motion.div
            className={styles.moodSelected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          >
            <button 
              className={styles.closeMoodBtn}
              onClick={() => setSelectedMood(null)}
              title="Close"
            >
              <FaTimes />
            </button>
            
            <div className={styles.moodInfo}>
              <h2>You selected: <span style={{ color: '#764ba2' }}>{selectedMood}</span></h2>
              <p>Discover songs that match your mood:</p>
            </div>

            <div className={styles.songsSection}>
              <button onClick={handleShowSongs} className={styles.viewSongsBtn}>
                <FaMusic style={{ marginRight: '8px' }} />
                View Songs
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          className={styles.searchSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <h2 className={styles.searchTitle}>Search Songs</h2>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by song title or artist..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            {searchQuery && (
              <div className={styles.searchResults}>
                {searchResults.length > 0 ? (
                  <div className={styles.searchSummary}>
                    <h3>Search Results</h3>
                    <p className={styles.resultCount}>
                      {searchResults.length} song{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"
                    </p>
                    <button
                      onClick={handleShowMore}
                      className={styles.viewSongsBtn}
                    >
                      <FaMusic style={{ marginRight: '8px' }} />
                      View Songs
                    </button>
                  </div>
                ) : (
                  <div className={styles.searchSummary}>
                    <h3>No Results Found</h3>
                    <p className={styles.resultCount}>
                      No songs found for "{searchQuery}"
                    </p>
                    <p className={styles.suggestionText}>
                      Try searching with different keywords or browse by mood
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.featuresSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
        >
          <h2 className={styles.featuresTitle}>Features</h2>
          <div className={styles.featuresGrid}>
            <motion.div
              className={styles.featureCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.featureIcon}>
                <FaCamera size={32} color="#43cea2" />
              </div>
              <h3>AI Mood Scanner</h3>
              <p>Use your webcam to automatically detect your mood and get instant song recommendations</p>
            </motion.div>

            <motion.div
              className={styles.featureCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.featureIcon}>
                <FaMusic size={32} color="#764ba2" />
              </div>
              <h3>Real Music Library</h3>
              <p>Access millions of real songs from independent artists, perfectly matched to your mood</p>
            </motion.div>

            <motion.div
              className={styles.featureCard}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.featureIcon}>
                <FaHeart size={32} color="#e91e63" />
              </div>
              <h3>Personal Library</h3>
              <p>Create your personal collection of favorite songs and access them anytime</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      <Footer isNightMode={isNightMode} />
    </div>
  );
};

export default Dashboard; 