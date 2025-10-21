// Exact file list:
const tracks = [
    {
      title: "Every Night",
      artist: "Mariya Takeuchi",
      src: "music/citypop/Mariya Takeuchi - Every Night (1980) [Japanese AOR].mp3",
       vinyl: "assets/vinyl/miss-m.png"
    },
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
    },
    {
      title: "Surpise of Summer",
      artist: "Anri",
      src: "music/citypop/Anri - Surprise of Summer.mp3",
      vinyl: "assets/vinyl/anri-timely.png"
    }
  ];
  
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
  };

  
  const DEFAULT_LABEL = "assets/vinyl/oldies.png";

  // Time formatting function
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  let i = 0;
  
  // Building a clickable list from the array above
  els.list.innerHTML = tracks.map((t, n) =>
    `<button data-n="${n}">${t.title} - ${t.artist}</button>`).join('');
  els.list.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    playIndex(Number(b.dataset.n));
  });
  
  function load(n){
    i = (n + tracks.length) % tracks.length;
    const t = tracks[i];
    els.audio.src = t.src;
    els.title.textContent = t.title;
    els.artist.textContent = t.artist;
    els.label.src = t.vinyl || DEFAULT_LABEL;
    
    // Reset time display
    els.currentTime.textContent = '0:00';
    els.totalTime.textContent = '0:00';
  }
  
  function playIndex(n){
    load(n);
    els.audio.play();
  }
  
  // Controls
  els.play.onclick = () => els.audio.paused ? els.audio.play() : els.audio.pause();
  els.prev.onclick = () => playIndex(i - 1);
  els.next.onclick = () => playIndex(i + 1);
  
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
  
  // Load first song (don’t autoplay)
  load(0);
  
  document.body.classList.add('has-bg');