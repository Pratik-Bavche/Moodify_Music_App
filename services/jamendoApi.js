// Jamendo API Service
// Get your free API key from: https://developer.jamendo.com/v3.0

const JAMENDO_CLIENT_ID = '2d7c4e8f'; // Demo API key for testing

// Mood to Jamendo tags mapping
const moodToTags = {
  'Happy': 'happy,upbeat,positive',
  'Sad': 'sad,melancholic,emotional',
  'Angry': 'intense,energetic,aggressive',
  'Tired': 'calm,relaxing,ambient',
  'Natural': 'peaceful,ambient,nature',
  'Excited': 'energetic,upbeat,party',
  'Relaxed': 'calm,relaxing,chill',
  'Romantic': 'romantic,love,soft',
  'Focused': 'instrumental,concentration,study',
  'Party': 'party,energetic,dance'
};

// Cache for storing fetched songs
const songCache = {};

export const fetchSongsByMood = async (mood, limit = 10) => {
  try {
    // Check cache first
    if (songCache[mood]) {
      return songCache[mood];
    }

    const tags = moodToTags[mood] || mood.toLowerCase();
    
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&tags=${tags}&audioformat=mp31&include=musicinfo`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      // Fallback to general search if no results
      const fallbackResponse = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}&audioformat=mp31&include=musicinfo`
      );
      const fallbackData = await fallbackResponse.json();
      return fallbackData.results || [];
    }

    // Cache the results
    songCache[mood] = data.results;
    
    return data.results;
  } catch (error) {
    console.error('Error fetching songs from Jamendo:', error);
    // Return fallback demo tracks if API fails
    return getFallbackSongs(mood, limit);
  }
};

// Fallback demo tracks if API fails
const getFallbackSongs = (mood, limit) => {
  const fallbackSongs = {
    'Happy': [
      { name: 'Happy Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Upbeat Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', album_image: 'https://i.imgur.com/6QK7B5U.jpg' },
      { name: 'Joyful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Cheerful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', album_image: 'https://i.imgur.com/4M34hi2.png' },
      { name: 'Bright Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' }
    ],
    'Sad': [
      { name: 'Sad Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Melancholic Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' },
      { name: 'Sorrowful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Gloomy Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Blue Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3', album_image: 'https://i.imgur.com/4M34hi2.png' }
    ],
    'Angry': [
      { name: 'Intense Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3', album_image: 'https://i.imgur.com/9QK7B5U.jpg' },
      { name: 'Energetic Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Powerful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3', album_image: 'https://i.imgur.com/2QK7B5U.jpg' },
      { name: 'Fierce Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3', album_image: 'https://i.imgur.com/5b6p6vG.png' },
      { name: 'Strong Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3', album_image: 'https://i.imgur.com/6QK7B5U.jpg' }
    ],
    'Tired': [
      { name: 'Calm Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3', album_image: 'https://i.imgur.com/2QK7B5U.jpg' },
      { name: 'Relaxing Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3', album_image: 'https://i.imgur.com/5b6p6vG.png' },
      { name: 'Peaceful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Gentle Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' },
      { name: 'Soothing Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' }
    ],
    'Natural': [
      { name: 'Peaceful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-54.mp3', album_image: 'https://i.imgur.com/4QK7B5U.jpg' },
      { name: 'Ambient Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-55.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Nature Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-56.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Organic Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-57.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Earth Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-58.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' }
    ],
    'Excited': [
      { name: 'Energetic Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-64.mp3', album_image: 'https://i.imgur.com/6QK7B5U.jpg' },
      { name: 'Party Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-65.mp3', album_image: 'https://i.imgur.com/5b6p6vG.png' },
      { name: 'Thrilling Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-66.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Dynamic Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-67.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Vibrant Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-68.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' }
    ],
    'Relaxed': [
      { name: 'Chill Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-74.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Calm Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-75.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Serene Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-76.mp3', album_image: 'https://i.imgur.com/6QK7B5U.jpg' },
      { name: 'Tranquil Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-77.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Mellow Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-78.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' }
    ],
    'Romantic': [
      { name: 'Love Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-84.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Soft Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-85.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' },
      { name: 'Tender Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-86.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Sweet Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-87.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Passionate Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-88.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' }
    ],
    'Focused': [
      { name: 'Study Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-94.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Concentration Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-95.mp3', album_image: 'https://i.imgur.com/1bX5QH6.png' },
      { name: 'Productive Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-96.mp3', album_image: 'https://i.imgur.com/6QK7B5U.jpg' },
      { name: 'Mindful Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-97.mp3', album_image: 'https://i.imgur.com/2nCt3Sbl.jpg' },
      { name: 'Attentive Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-98.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' }
    ],
    'Party': [
      { name: 'Dance Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-104.mp3', album_image: 'https://i.imgur.com/5b6p6vG.png' },
      { name: 'Party Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-105.mp3', album_image: 'https://i.imgur.com/3yaf2Qp.png' },
      { name: 'Celebration Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-106.mp3', album_image: 'https://i.imgur.com/4M34hi2.png' },
      { name: 'Festive Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-107.mp3', album_image: 'https://i.imgur.com/7QK7B5U.jpg' },
      { name: 'Fun Demo', artist_name: 'Demo Artist', audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-108.mp3', album_image: 'https://i.imgur.com/2QK7B5U.jpg' }
    ]
  };

  return fallbackSongs[mood] || fallbackSongs['Happy'];
};

// Convert Jamendo track to our song format
export const convertJamendoTrack = (track) => ({
  title: track.name,
  artist: track.artist_name,
  albumArt: track.album_image || 'https://i.imgur.com/1bX5QH6.png',
  audio: track.audio,
  mood: track.tags ? track.tags[0] : 'Happy' // Use first tag as mood
});

// Get all songs for a mood (converted to our format)
export const getSongsByMood = async (mood, limit = 10) => {
  const tracks = await fetchSongsByMood(mood, limit);
  return tracks.map(convertJamendoTrack);
}; 