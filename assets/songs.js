const songs = [
  // Happy
  { title: "Sunshine Smile", artist: "Joyful Beats", mood: "Happy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Dancing in the Rain", artist: "Uplift Crew", mood: "Happy", url: "https://example.com/happy2.mp3" },
  { title: "Bright Days", artist: "Sunny Tunes", mood: "Happy", url: "https://example.com/happy3.mp3" },
  { title: "Cheer Up!", artist: "Smiles Band", mood: "Happy", url: "https://example.com/happy4.mp3" },
  { title: "Joyride", artist: "Feel Good", mood: "Happy", url: "https://example.com/happy5.mp3" },
  { title: "Good Vibes", artist: "Positive Energy", mood: "Happy", url: "https://example.com/happy6.mp3" },
  { title: "Laugh Out Loud", artist: "Fun Times", mood: "Happy", url: "https://example.com/happy7.mp3" },
  { title: "Happy Together", artist: "The Friends", mood: "Happy", url: "https://example.com/happy8.mp3" },
  { title: "Shining Star", artist: "Bright Lights", mood: "Happy", url: "https://example.com/happy9.mp3" },
  { title: "Celebrate Life", artist: "Party Crew", mood: "Happy", url: "https://example.com/happy10.mp3" },

  // Sad
  { title: "Rainy Window", artist: "Blue Notes", mood: "Sad", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Lost in Thought", artist: "Melancholy", mood: "Sad", url: "https://example.com/sad2.mp3" },
  { title: "Tears of the Night", artist: "Lonely Hearts", mood: "Sad", url: "https://example.com/sad3.mp3" },
  { title: "Empty Streets", artist: "Solitude", mood: "Sad", url: "https://example.com/sad4.mp3" },
  { title: "Goodbye Again", artist: "Farewell", mood: "Sad", url: "https://example.com/sad5.mp3" },
  { title: "Broken Dreams", artist: "Shattered", mood: "Sad", url: "https://example.com/sad6.mp3" },
  { title: "Fading Memories", artist: "Reminisce", mood: "Sad", url: "https://example.com/sad7.mp3" },
  { title: "Alone Tonight", artist: "Nightfall", mood: "Sad", url: "https://example.com/sad8.mp3" },
  { title: "Silent Cry", artist: "Whisper", mood: "Sad", url: "https://example.com/sad9.mp3" },
  { title: "Last Embrace", artist: "Parting", mood: "Sad", url: "https://example.com/sad10.mp3" },

  // Angry
  { title: "Firestorm", artist: "Rage Mode", mood: "Angry", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Break the Chains", artist: "Unleashed", mood: "Angry", url: "https://example.com/angry2.mp3" },
  { title: "Thunderstrike", artist: "Storm Riders", mood: "Angry", url: "https://example.com/angry3.mp3" },
  { title: "No Surrender", artist: "Defiant", mood: "Angry", url: "https://example.com/angry4.mp3" },
  { title: "Rebel Yell", artist: "Outlaws", mood: "Angry", url: "https://example.com/angry5.mp3" },
  { title: "Burn It Down", artist: "Inferno", mood: "Angry", url: "https://example.com/angry6.mp3" },
  { title: "Unstoppable", artist: "Force", mood: "Angry", url: "https://example.com/angry7.mp3" },
  { title: "Fight Back", artist: "Warriors", mood: "Angry", url: "https://example.com/angry8.mp3" },
  { title: "Wildfire", artist: "Blaze", mood: "Angry", url: "https://example.com/angry9.mp3" },
  { title: "Outrage", artist: "Fury", mood: "Angry", url: "https://example.com/angry10.mp3" },

  // Tired
  { title: "Sleepy Eyes", artist: "Dreamers", mood: "Tired", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Yawning Skies", artist: "Cloud Nine", mood: "Tired", url: "https://example.com/tired2.mp3" },
  { title: "Midnight Lullaby", artist: "Night Owls", mood: "Tired", url: "https://example.com/tired3.mp3" },
  { title: "Rest Easy", artist: "Calm Collective", mood: "Tired", url: "https://example.com/tired4.mp3" },
  { title: "Dreamland", artist: "Sleep Sound", mood: "Tired", url: "https://example.com/tired5.mp3" },
  { title: "Pillow Talk", artist: "Soft Voices", mood: "Tired", url: "https://example.com/tired6.mp3" },
  { title: "Slow Down", artist: "Relaxation", mood: "Tired", url: "https://example.com/tired7.mp3" },
  { title: "Night Breeze", artist: "Gentle Wind", mood: "Tired", url: "https://example.com/tired8.mp3" },
  { title: "Quiet Hours", artist: "Stillness", mood: "Tired", url: "https://example.com/tired9.mp3" },
  { title: "Soft Slumber", artist: "Peaceful", mood: "Tired", url: "https://example.com/tired10.mp3" },

  // Natural
  { title: "Forest Walk", artist: "Nature Sound", mood: "Natural", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Mountain Air", artist: "Earth Tones", mood: "Natural", url: "https://example.com/natural2.mp3" },
  { title: "River Flow", artist: "Calm Waters", mood: "Natural", url: "https://example.com/natural3.mp3" },
  { title: "Birdsong", artist: "Morning Light", mood: "Natural", url: "https://example.com/natural4.mp3" },
  { title: "Ocean Waves", artist: "Blue Horizon", mood: "Natural", url: "https://example.com/natural5.mp3" },
  { title: "Rainforest", artist: "Green World", mood: "Natural", url: "https://example.com/natural6.mp3" },
  { title: "Desert Sun", artist: "Sandy Feet", mood: "Natural", url: "https://example.com/natural7.mp3" },
  { title: "Wind Whisper", artist: "Breeze", mood: "Natural", url: "https://example.com/natural8.mp3" },
  { title: "Thunderstorm", artist: "Sky Power", mood: "Natural", url: "https://example.com/natural9.mp3" },
  { title: "Sunrise", artist: "Dawn", mood: "Natural", url: "https://example.com/natural10.mp3" },

  // Excited
  { title: "Jump Up", artist: "Energy Rush", mood: "Excited", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Let's Go!", artist: "Hype Crew", mood: "Excited", url: "https://example.com/excited2.mp3" },
  { title: "Adrenaline", artist: "Pulse", mood: "Excited", url: "https://example.com/excited3.mp3" },
  { title: "On the Move", artist: "Fast Lane", mood: "Excited", url: "https://example.com/excited4.mp3" },
  { title: "Big Win", artist: "Champions", mood: "Excited", url: "https://example.com/excited5.mp3" },
  { title: "Victory Lap", artist: "Winners", mood: "Excited", url: "https://example.com/excited6.mp3" },
  { title: "Party Starter", artist: "Fun Squad", mood: "Excited", url: "https://example.com/excited7.mp3" },
  { title: "Go Time", artist: "Motivators", mood: "Excited", url: "https://example.com/excited8.mp3" },
  { title: "Amped Up", artist: "Boost", mood: "Excited", url: "https://example.com/excited9.mp3" },
  { title: "Fire Up", artist: "Ignite", mood: "Excited", url: "https://example.com/excited10.mp3" },

  // Relaxed
  { title: "Chill Out", artist: "Calm Crew", mood: "Relaxed", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Easy Breeze", artist: "Smooth Flow", mood: "Relaxed", url: "https://example.com/relaxed2.mp3" },
  { title: "Gentle Touch", artist: "Soft Sound", mood: "Relaxed", url: "https://example.com/relaxed3.mp3" },
  { title: "Peaceful Mind", artist: "Zen Masters", mood: "Relaxed", url: "https://example.com/relaxed4.mp3" },
  { title: "Serenity", artist: "Tranquil", mood: "Relaxed", url: "https://example.com/relaxed5.mp3" },
  { title: "Calm Waters", artist: "Still Lake", mood: "Relaxed", url: "https://example.com/relaxed6.mp3" },
  { title: "Quiet Moments", artist: "Peaceful", mood: "Relaxed", url: "https://example.com/relaxed7.mp3" },
  { title: "Restful", artist: "Harmony", mood: "Relaxed", url: "https://example.com/relaxed8.mp3" },
  { title: "Slow Flow", artist: "Gentle Stream", mood: "Relaxed", url: "https://example.com/relaxed9.mp3" },
  { title: "Zen Garden", artist: "Nature Calm", mood: "Relaxed", url: "https://example.com/relaxed10.mp3" },

  // Romantic
  { title: "Love Song", artist: "Heartbeats", mood: "Romantic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Moonlight", artist: "Serenade", mood: "Romantic", url: "https://example.com/romantic2.mp3" },
  { title: "Sweetheart", artist: "Cupid's Arrow", mood: "Romantic", url: "https://example.com/romantic3.mp3" },
  { title: "First Kiss", artist: "Blush", mood: "Romantic", url: "https://example.com/romantic4.mp3" },
  { title: "Forever Yours", artist: "Devotion", mood: "Romantic", url: "https://example.com/romantic5.mp3" },
  { title: "Heart to Heart", artist: "Connection", mood: "Romantic", url: "https://example.com/romantic6.mp3" },
  { title: "Endless Love", artist: "Passion", mood: "Romantic", url: "https://example.com/romantic7.mp3" },
  { title: "Candlelight", artist: "Intimate", mood: "Romantic", url: "https://example.com/romantic8.mp3" },
  { title: "Soulmate", artist: "Bond", mood: "Romantic", url: "https://example.com/romantic9.mp3" },
  { title: "Stolen Glances", artist: "Secret Love", mood: "Romantic", url: "https://example.com/romantic10.mp3" },

  // Focused
  { title: "Deep Work", artist: "Concentration", mood: "Focused", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Study Time", artist: "Brain Boost", mood: "Focused", url: "https://example.com/focused2.mp3" },
  { title: "Laser Focus", artist: "Sharp Minds", mood: "Focused", url: "https://example.com/focused3.mp3" },
  { title: "Productivity", artist: "Get It Done", mood: "Focused", url: "https://example.com/focused4.mp3" },
  { title: "No Distractions", artist: "Tunnel Vision", mood: "Focused", url: "https://example.com/focused5.mp3" },
  { title: "In the Zone", artist: "Flow State", mood: "Focused", url: "https://example.com/focused6.mp3" },
  { title: "Mindset", artist: "Achievers", mood: "Focused", url: "https://example.com/focused7.mp3" },
  { title: "Concentration", artist: "Focus Group", mood: "Focused", url: "https://example.com/focused8.mp3" },
  { title: "Work Mode", artist: "Task Force", mood: "Focused", url: "https://example.com/focused9.mp3" },
  { title: "Brainstorm", artist: "Think Tank", mood: "Focused", url: "https://example.com/focused10.mp3" },

  // Party
  { title: "Dance Floor", artist: "Nightlife", mood: "Party", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Turn Up", artist: "DJ Hype", mood: "Party", url: "https://example.com/party2.mp3" },
  { title: "All Night", artist: "Groove Masters", mood: "Party", url: "https://example.com/party3.mp3" },
  { title: "Celebrate", artist: "Good Times", mood: "Party", url: "https://example.com/party4.mp3" },
  { title: "Bass Drop", artist: "Electro Beat", mood: "Party", url: "https://example.com/party5.mp3" },
  { title: "Glow Sticks", artist: "Rave Crew", mood: "Party", url: "https://example.com/party6.mp3" },
  { title: "Fiesta", artist: "Latin Heat", mood: "Party", url: "https://example.com/party7.mp3" },
  { title: "Get Down", artist: "Funky Bunch", mood: "Party", url: "https://example.com/party8.mp3" },
  { title: "Epic Night", artist: "Party Squad", mood: "Party", url: "https://example.com/party9.mp3" },
  { title: "Confetti", artist: "Celebrators", mood: "Party", url: "https://example.com/party10.mp3" }
];

export default songs; 