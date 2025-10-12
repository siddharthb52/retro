// Exact file list:
const tracks = [
    {
      title: "Every Night (1980) [Japanese AOR]",
      artist: "Mariya Takeuchi",
      src: "music/citypop/Mariya Takeuchi - Every Night (1980) [Japanese AOR].mp3",
       cover: "assets/covers/miss-m.jpg"
    },
    {
      title: "Let's Groove",
      artist: "Earth, Wind & Fire",
      src: "music/oldies_usa/Let's Groove.mp3",
      cover: "assets/covers/lets-groove.png"
    },
    {
      title: "You Know How to Love Me (Long Version)",
      artist: "Phyllis Hyman",
      src: "music/oldies_usa/You Know How to Love Me (Long Version).mp3"
    },
    {
      title: "Ooh Baby Baby (12 Inch Version)",
      artist: "Zapp",
      src: "music/oldies_usa/Zapp - Ooh Baby Baby (12 Inch Version).mp3"
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
  };

  
  const DEFAULT_LABEL = "assets/covers/oldies.png";

  
  let i = 0;
  
  // Building a clickable list from the array above
  els.list.innerHTML = tracks.map((t, n) =>
    `<button data-n="${n}">${t.title} — ${t.artist}</button>`).join('');
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
    els.label.src = t.cover || DEFAULT_LABEL;
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
  els.audio.onplay = () => { els.play.textContent = '⏸'; els.vinyl.classList.add('playing'); };
  els.audio.onpause = () => { els.play.textContent = '▶️'; els.vinyl.classList.remove('playing'); };
  
  els.audio.ontimeupdate = () => {
    if (!els.audio.duration) return;
    els.seek.value = Math.floor(100 * els.audio.currentTime / els.audio.duration);
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