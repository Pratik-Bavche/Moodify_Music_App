// Comprehensive Music API Service
// Uses multiple APIs to fetch songs based on mood

// API Keys (you can get free keys from these services)
const JAMENDO_CLIENT_ID = '2d7c4e8f'; // Demo key
const DEEZER_BASE_URL = 'https://api.deezer.com';
const LASTFM_API_KEY = 'YOUR_LASTFM_API_KEY'; // Get from https://www.last.fm/api/account/create
const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID'; // Get from https://developer.spotify.com/

// Mood to search terms mapping
const moodToSearchTerms = {
  'Happy': ['happy', 'upbeat', 'joyful', 'cheerful', 'positive'],
  'Sad': ['sad', 'melancholic', 'emotional', 'sorrowful', 'blue'],
  'Angry': ['intense', 'energetic', 'aggressive', 'powerful', 'fierce'],
  'Tired': ['calm', 'relaxing', 'ambient', 'peaceful', 'gentle'],
  'Natural': ['peaceful', 'ambient', 'nature', 'organic', 'earth'],
  'Excited': ['energetic', 'upbeat', 'party', 'thrilling', 'dynamic'],
  'Relaxed': ['calm', 'relaxing', 'chill', 'serene', 'tranquil'],
  'Romantic': ['romantic', 'love', 'soft', 'tender', 'sweet'],
  'Focused': ['instrumental', 'concentration', 'study', 'productive', 'mindful'],
  'Party': ['party', 'energetic', 'dance', 'celebration', 'festive']
};

// Cache for storing fetched songs
const songCache = {};

// Main function to get songs by mood
export const getSongsByMood = async (mood, limit = 10) => {
  try {
    // Check cache first
    const cacheKey = `${mood}-${limit}`;
    if (songCache[cacheKey]) {
      return songCache[cacheKey];
    }

    // Try multiple APIs in sequence
    let songs = [];
    
    // Try Deezer API first (no API key required)
    try {
      const deezerSongs = await fetchFromDeezer(mood, limit);
      songs = [...songs, ...deezerSongs];
    } catch (error) {
      console.log('Deezer API failed, trying alternatives...');
    }

    // Try Jamendo API
    if (songs.length < limit) {
      try {
        const jamendoSongs = await fetchFromJamendo(mood, limit - songs.length);
        songs = [...songs, ...jamendoSongs];
      } catch (error) {
        console.log('Jamendo API failed, trying alternatives...');
      }
    }

    // Try Last.fm API
    if (songs.length < limit && LASTFM_API_KEY !== 'YOUR_LASTFM_API_KEY') {
      try {
        const lastfmSongs = await fetchFromLastfm(mood, limit - songs.length);
        songs = [...songs, ...lastfmSongs];
      } catch (error) {
        console.log('Last.fm API failed, trying alternatives...');
      }
    }

    // If no songs found, use fallback
    if (songs.length === 0) {
      songs = getFallbackSongs(mood, limit);
    }

    // Cache the results
    songCache[cacheKey] = songs.slice(0, limit);
    
    return songCache[cacheKey];
  } catch (error) {
    console.error('Error fetching songs:', error);
    return getFallbackSongs(mood, limit);
  }
};

// Deezer API (no API key required)
const fetchFromDeezer = async (mood, limit) => {
  const searchTerms = moodToSearchTerms[mood] || [mood.toLowerCase()];
  const songs = [];

  for (const term of searchTerms) {
    if (songs.length >= limit) break;
    
    try {
      const response = await fetch(`${DEEZER_BASE_URL}/search?q=${encodeURIComponent(term)}&limit=${Math.ceil(limit/2)}`);
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const newSongs = data.data.map(track => ({
          title: track.title,
          artist: track.artist.name,
          albumArt: track.album.cover_medium || 'https://i.imgur.com/1bX5QH6.png',
          audio: track.preview || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          mood: mood,
          source: 'Deezer'
        }));
        songs.push(...newSongs);
      }
    } catch (error) {
      console.log(`Deezer search failed for term: ${term}`);
    }
  }

  return songs.slice(0, limit);
};

// Jamendo API
const fetchFromJamendo = async (mood, limit) => {
  const tags = moodToSearchTerms[mood]?.slice(0, 3).join(',') || mood.toLowerCase();
  
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&tags=${tags}&audioformat=mp31&include=musicinfo`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results.map(track => ({
        title: track.name,
        artist: track.artist_name,
        albumArt: track.album_image || 'https://i.imgur.com/1bX5QH6.png',
        audio: track.audio,
        mood: mood,
        source: 'Jamendo'
      }));
    }
  } catch (error) {
    console.log('Jamendo API error:', error);
  }

  return [];
};

// Last.fm API
const fetchFromLastfm = async (mood, limit) => {
  const searchTerms = moodToSearchTerms[mood] || [mood.toLowerCase()];
  const songs = [];

  for (const term of searchTerms) {
    if (songs.length >= limit) break;
    
    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(term)}&api_key=${LASTFM_API_KEY}&format=json&limit=${Math.ceil(limit/2)}`
      );
      const data = await response.json();
      
      if (data.results && data.results.trackmatches && data.results.trackmatches.track) {
        const tracks = Array.isArray(data.results.trackmatches.track) 
          ? data.results.trackmatches.track 
          : [data.results.trackmatches.track];
        
        const newSongs = tracks.map(track => ({
          title: track.name,
          artist: track.artist,
          albumArt: track.image?.[2]?.['#text'] || 'https://i.imgur.com/1bX5QH6.png',
          audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Last.fm doesn't provide audio
          mood: mood,
          source: 'Last.fm'
        }));
        songs.push(...newSongs);
      }
    } catch (error) {
      console.log(`Last.fm search failed for term: ${term}`);
    }
  }

  return songs.slice(0, limit);
};

// Spotify API (requires authentication)
export const fetchFromSpotify = async (mood, limit) => {
  // This would require OAuth2 authentication
  // For now, returning empty array
  return [];
};

// Fallback songs if all APIs fail
const getFallbackSongs = (mood, limit) => {
  const fallbackSongs = {
    'Happy': [
      { title: 'Happy Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', mood: 'Happy', source: 'Demo' },
      { title: 'Upbeat Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/6QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', mood: 'Happy', source: 'Demo' },
      { title: 'Joyful Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', mood: 'Happy', source: 'Demo' }
    ],
    'Sad': [
      { title: 'Sad Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/2nCt3Sbl.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', mood: 'Sad', source: 'Demo' },
      { title: 'Melancholic Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/7QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', mood: 'Sad', source: 'Demo' },
      { title: 'Sorrowful Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3', mood: 'Sad', source: 'Demo' }
    ],
    'Angry': [
      { title: 'Intense Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/9QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3', mood: 'Angry', source: 'Demo' },
      { title: 'Energetic Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3', mood: 'Angry', source: 'Demo' },
      { title: 'Powerful Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/2QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3', mood: 'Angry', source: 'Demo' }
    ],
    'Tired': [
      { title: 'Calm Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/2QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3', mood: 'Tired', source: 'Demo' },
      { title: 'Relaxing Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/5b6p6vG.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3', mood: 'Tired', source: 'Demo' },
      { title: 'Peaceful Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3', mood: 'Tired', source: 'Demo' }
    ],
    'Natural': [
      { title: 'Peaceful Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/4QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-54.mp3', mood: 'Natural', source: 'Demo' },
      { title: 'Ambient Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-55.mp3', mood: 'Natural', source: 'Demo' },
      { title: 'Nature Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-56.mp3', mood: 'Natural', source: 'Demo' }
    ],
    'Excited': [
      { title: 'Energetic Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/6QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-64.mp3', mood: 'Excited', source: 'Demo' },
      { title: 'Party Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/5b6p6vG.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-65.mp3', mood: 'Excited', source: 'Demo' },
      { title: 'Thrilling Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-66.mp3', mood: 'Excited', source: 'Demo' }
    ],
    'Relaxed': [
      { title: 'Chill Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-74.mp3', mood: 'Relaxed', source: 'Demo' },
      { title: 'Calm Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-75.mp3', mood: 'Relaxed', source: 'Demo' },
      { title: 'Serene Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/6QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-76.mp3', mood: 'Relaxed', source: 'Demo' }
    ],
    'Romantic': [
      { title: 'Love Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-84.mp3', mood: 'Romantic', source: 'Demo' },
      { title: 'Soft Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/7QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-85.mp3', mood: 'Romantic', source: 'Demo' },
      { title: 'Tender Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-86.mp3', mood: 'Romantic', source: 'Demo' }
    ],
    'Focused': [
      { title: 'Study Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-94.mp3', mood: 'Focused', source: 'Demo' },
      { title: 'Concentration Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/1bX5QH6.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-95.mp3', mood: 'Focused', source: 'Demo' },
      { title: 'Productive Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/6QK7B5U.jpg', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-96.mp3', mood: 'Focused', source: 'Demo' }
    ],
    'Party': [
      { title: 'Dance Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/5b6p6vG.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-104.mp3', mood: 'Party', source: 'Demo' },
      { title: 'Party Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/3yaf2Qp.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-105.mp3', mood: 'Party', source: 'Demo' },
      { title: 'Celebration Demo', artist: 'Demo Artist', albumArt: 'https://i.imgur.com/4M34hi2.png', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-106.mp3', mood: 'Party', source: 'Demo' }
    ]
  };

  return fallbackSongs[mood] || fallbackSongs['Happy'];
};

// Clear cache
export const clearSongCache = () => {
  Object.keys(songCache).forEach(key => delete songCache[key]);
};

// Get song source info
export const getSongSource = (song) => {
  return song.source || 'Unknown';
}; 