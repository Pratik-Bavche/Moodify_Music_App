# Music API Setup Guide for Moodify

This guide explains how to set up the various music APIs used in Moodify to fetch songs based on mood without storing them locally.

## 🎵 Available APIs

### 1. **Deezer API** (Recommended - No API Key Required)

- **Status**: ✅ Ready to use
- **Features**:
  - No API key required
  - Large music library
  - Provides song previews
  - High-quality album art
- **Setup**: No setup required, works out of the box

### 2. **Jamendo API** (Free Tier Available)

- **Status**: ✅ Ready to use (with demo key)
- **Features**:
  - Free tier: 200 requests/day
  - Independent artists
  - Full song streaming
- **Setup**:
  1. Go to [Jamendo Developer Portal](https://developer.jamendo.com/v3.0)
  2. Create a free account
  3. Get your Client ID
  4. Replace `'2d7c4e8f'` in `musicApi.js` with your Client ID

### 3. **Last.fm API** (Free)

- **Status**: ⚠️ Requires API key
- **Features**:
  - Extensive music database
  - Music discovery
  - Artist and track information
- **Setup**:
  1. Go to [Last.fm API](https://www.last.fm/api/account/create)
  2. Create an account
  3. Get your API key
  4. Replace `'YOUR_LASTFM_API_KEY'` in `musicApi.js`

### 4. **Spotify API** (Advanced)

- **Status**: 🔧 Requires OAuth2 setup
- **Features**:
  - Largest music library
  - High-quality audio
  - Advanced features
- **Setup**:
  1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/)
  2. Create an app
  3. Get Client ID and Client Secret
  4. Implement OAuth2 flow (advanced setup)

## 🚀 Quick Start

### Option 1: Use Default Setup (Recommended)

The app works immediately with:

- Deezer API (no setup required)
- Jamendo API (demo key included)
- Fallback demo tracks

### Option 2: Add Your Own API Keys

1. Open `Moodify/frontend/src/services/musicApi.js`
2. Replace the placeholder API keys:
   ```javascript
   const JAMENDO_CLIENT_ID = "YOUR_JAMENDO_CLIENT_ID";
   const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";
   const SPOTIFY_CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
   ```

## 📊 How It Works

### API Priority Order:

1. **Deezer API** - Primary source (no key required)
2. **Jamendo API** - Secondary source (independent artists)
3. **Last.fm API** - Tertiary source (if API key provided)
4. **Fallback Demo Tracks** - If all APIs fail

### Mood Mapping:

Each mood is mapped to multiple search terms:

- **Happy**: happy, upbeat, joyful, cheerful, positive
- **Sad**: sad, melancholic, emotional, sorrowful, blue
- **Angry**: intense, energetic, aggressive, powerful, fierce
- **Tired**: calm, relaxing, ambient, peaceful, gentle
- **Natural**: peaceful, ambient, nature, organic, earth
- **Excited**: energetic, upbeat, party, thrilling, dynamic
- **Relaxed**: calm, relaxing, chill, serene, tranquil
- **Romantic**: romantic, love, soft, tender, sweet
- **Focused**: instrumental, concentration, study, productive, mindful
- **Party**: party, energetic, dance, celebration, festive

## 🎯 Features

### Multi-Source Song Fetching:

- Automatically tries multiple APIs
- Combines results from different sources
- Fallback to demo tracks if APIs fail
- Caching for better performance

### Song Information:

- Title and artist
- Album artwork
- Audio preview/streaming
- Mood classification
- Source indication (Deezer, Jamendo, Last.fm, etc.)

### Visual Indicators:

- Source badges show which API provided each song
- Color-coded badges for easy identification
- Mood tags for each song

## 🔧 Configuration

### Customizing Search Terms:

Edit the `moodToSearchTerms` object in `musicApi.js`:

```javascript
const moodToSearchTerms = {
  Happy: ["happy", "upbeat", "joyful", "cheerful", "positive"],
  Sad: ["sad", "melancholic", "emotional", "sorrowful", "blue"],
  // Add more moods and terms...
};
```

### Adjusting Song Limits:

Change the default limit in function calls:

```javascript
const songs = await getSongsByMood("Happy", 15); // Get 15 songs
```

### Cache Management:

```javascript
import { clearSongCache } from "../services/musicApi";

// Clear cache when needed
clearSongCache();
```

## 🎵 API Limitations

### Deezer API:

- ✅ No rate limits
- ✅ No API key required
- ⚠️ Limited to 30-second previews
- ⚠️ Some songs may not have previews

### Jamendo API:

- ✅ Full song streaming
- ⚠️ 200 requests/day (free tier)
- ⚠️ Independent artists only

### Last.fm API:

- ✅ Extensive database
- ⚠️ No audio streaming
- ⚠️ Requires API key

## 🚨 Troubleshooting

### No Songs Loading:

1. Check browser console for errors
2. Verify API keys are correct
3. Check internet connection
4. Try refreshing the page

### API Rate Limits:

- Jamendo: 200 requests/day
- Last.fm: 5 requests/second
- Deezer: No limits

### CORS Issues:

- All APIs support CORS
- If issues occur, check browser console
- Consider using a proxy for development

## 📈 Performance Tips

1. **Use Caching**: Songs are cached automatically
2. **Limit Requests**: Don't fetch too many songs at once
3. **Monitor Usage**: Keep track of API usage
4. **Fallback Strategy**: Always have demo tracks as backup

## 🔒 Security Notes

- API keys are stored in frontend code (public)
- For production, consider backend proxy
- Deezer API is safe to use publicly
- Monitor API usage to avoid rate limits

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify API keys are correct
3. Test with different moods
4. Check API service status pages

---

**Happy coding! 🎵✨**
