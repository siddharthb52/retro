// Scene-based music library data
export const scenes = {
  citypop: {
    name: "City Pop",
    background: "assets/wood2-bg.png",
    tracks: [
      {
        title: "Every Night",
        artist: "Mariya Takeuchi",
        src: "music/citypop/Mariya Takeuchi - Every Night (1980) [Japanese AOR].mp3",
        vinyl: "assets/vinyl/miss-m.png"
      },
      {
        title: "Surprise of Summer",
        artist: "Anri",
        src: "music/citypop/Anri - Surprise of Summer.mp3",
        vinyl: "assets/vinyl/anri-timely.png"
      }
    ]
  },
  oldies: {
    name: "Oldies",
    background: "assets/brown-bg.png",
    tracks: [
      {
        title: "Let's Groove",
        artist: "Earth, Wind & Fire",
        src: "music/oldies_usa/Let's Groove.mp3",
        vinyl: "assets/vinyl/lets-groove.png"
      },
      {
        title: "You Know How to Love Me (Long Version)",
        artist: "Phyllis Hyman",
        src: "music/oldies_usa/You Know How to Love Me (Long Version).mp3",
        vinyl: "assets/vinyl/you-know-how-to-love-me.png"
      },
      {
        title: "Ooh Baby Baby (12 Inch Version)",
        artist: "Zapp",
        src: "music/oldies_usa/Zapp - Ooh Baby Baby (12 Inch Version).mp3",
        vinyl: "assets/vinyl/ooh-baby-baby-zapp.png"
      },
      {
        title: "Cool It Now",
        artist: "New Edition",
        src: "music/oldies_usa/New Edition - Cool It Now.mp3",
        vinyl: "assets/vinyl/cool-it-now.png"
      }
    ]
  }
};

// Default vinyl cover
export const DEFAULT_VINYL = "assets/vinyl/oldies.png";
