// Scene-based music library
const scenes = {
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

// Current scene and track management
let currentScene = 'citypop';
let currentTrackIndex = 0;
  
  // Definition of elements on screen
  const els = {
    list: document.querySelector('#tracklist'),
    audio: document.querySelector('#audio'),
    play: document.querySelector('#play'),
    prev: document.querySelector('#prev'),
    next: document.querySelector('#next'),
    seek: document.querySelector('#seek'),
    title: document.querySelector('#title'),
    artist: document.querySelector('#artist'),
    vinyl: document.querySelector('#vinyl'),
    label: document.querySelector('#label'),
    currentTime: document.querySelector('#current-time'),
    totalTime: document.querySelector('#total-time'),
    playIcon: document.querySelector('#play-icon'),
    pauseIcon: document.querySelector('#pause-icon'),
    sceneButtons: document.querySelectorAll('.scene-btn'),
    body: document.body,
  };

  // Default vinyl cover
  const DEFAULT_VINYL = "assets/vinyl/oldies.png";

  // Time formatting function
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Scene management functions
  function switchScene(sceneId) {
    if (!scenes[sceneId]) return;
    
    // Stop current audio and vinyl rotation
    els.audio.pause();
    els.vinyl.classList.remove('playing');
    
    // Update play/pause button to show play icon
    els.playIcon.style.display = 'block';
    els.pauseIcon.style.display = 'none';
    
    currentScene = sceneId;
    currentTrackIndex = 0;
    
    // Update background
    const scene = scenes[sceneId];
    els.body.style.background = `#0b0b0b url("../${scene.background}") center / cover fixed no-repeat`;
    
    // Update scene buttons
    els.sceneButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.scene === sceneId) {
        btn.classList.add('active');
      }
    });
    
    // Update track list
    updateTrackList();
    
    // Load first track of new scene (but don't play it)
    loadTrack(0);
  }

  function updateTrackList() {
    const tracks = scenes[currentScene].tracks;
    els.list.innerHTML = tracks.map((t, n) =>
      `<button data-n="${n}">${t.title} — ${t.artist}</button>`).join('');
  }

  function getCurrentTracks() {
    return scenes[currentScene].tracks;
  }
  
  // Initialize track list and event listeners
  updateTrackList();
  els.list.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    playTrack(Number(b.dataset.n));
  });
  
  // Scene button event listeners
  els.sceneButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchScene(btn.dataset.scene);
    });
  });
  
  // Loading the track at index n (wrap around if n is out of bounds)
  function loadTrack(n){
    const tracks = getCurrentTracks();
    currentTrackIndex = (n + tracks.length) % tracks.length;
    const t = tracks[currentTrackIndex];
    els.audio.src = t.src;
    els.title.textContent = t.title;
    els.artist.textContent = t.artist;
    els.label.src = t.vinyl || DEFAULT_VINYL;
    
    // Reset time display
    els.currentTime.textContent = '0:00';
    els.totalTime.textContent = '0:00';
  }
  
  function playTrack(n){
    loadTrack(n);
    els.audio.play();
  }
  
  // Controls
  els.play.onclick = () => els.audio.paused ? els.audio.play() : els.audio.pause();
  els.prev.onclick = () => playTrack(currentTrackIndex - 1);
  els.next.onclick = () => playTrack(currentTrackIndex + 1);
  
  // UI reactions
  els.audio.onplay = () => { 
    els.playIcon.style.display = 'none';
    els.pauseIcon.style.display = 'block';
    els.vinyl.classList.add('playing'); 
  };
  els.audio.onpause = () => { 
    els.playIcon.style.display = 'block';
    els.pauseIcon.style.display = 'none';
    els.vinyl.classList.remove('playing'); 
  };
  
  els.audio.onloadedmetadata = () => {
    els.totalTime.textContent = formatTime(els.audio.duration);
  };
  
  els.audio.ontimeupdate = () => {
    if (!els.audio.duration) return;
    els.seek.value = Math.floor(100 * els.audio.currentTime / els.audio.duration);
    els.currentTime.textContent = formatTime(els.audio.currentTime);
  };
  els.seek.oninput = () => {
    if (!els.audio.duration) return;
    els.audio.currentTime = els.audio.duration * (els.seek.value / 100);
  };
  
  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === ' ') { e.preventDefault(); els.play.click(); }
    if (k === 'arrowright') els.audio.currentTime += 5;
    if (k === 'arrowleft') els.audio.currentTime -= 5;
    if (k === 'n') els.next.click();
    if (k === 'p') els.prev.click();
  });
  
  // Load first song (don't autoplay)
  loadTrack(0);
  
  // Initialize with first scene
  switchScene('citypop');
  
  document.body.classList.add('has-bg');