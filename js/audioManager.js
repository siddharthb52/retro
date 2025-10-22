// Audio management module
import { DEFAULT_LABEL } from '../data/scenes.js';
import { formatTime, updatePlayButton, updateVinylRotation } from './utils.js';

/**
 * Audio Manager class handles all audio playback functionality
 */
export class AudioManager {
  constructor(els, sceneManager) {
    this.els = els;
    this.sceneManager = sceneManager;
    this.setupEventListeners();
  }

  /**
   * Load a track at the specified index
   * @param {number} n - Track index to load
   */
  loadTrack(n) {
    const tracks = this.sceneManager.getCurrentTracks();
    const trackIndex = (n + tracks.length) % tracks.length;
    this.sceneManager.setCurrentTrackIndex(trackIndex);
    
    const track = tracks[trackIndex];
    this.els.audio.src = track.src;
    this.els.title.textContent = track.title;
    this.els.artist.textContent = track.artist;
    this.els.label.src = track.label || DEFAULT_LABEL;
    
    // Reset time display
    this.els.currentTime.textContent = '0:00';
    this.els.totalTime.textContent = '0:00';
  }

  /**
   * Play a track at the specified index
   * @param {number} n - Track index to play
   */
  playTrack(n) {
    this.loadTrack(n);
    this.els.audio.play();
  }

  /**
   * Play the current track
   */
  play() {
    this.els.audio.play();
  }

  /**
   * Pause the current track
   */
  pause() {
    this.els.audio.pause();
    // Manually update UI since programmatic pause doesn't trigger onpause event
    updatePlayButton(this.els, false);
    updateVinylRotation(this.els, false);
  }

  /**
   * Play previous track
   */
  playPrevious() {
    const currentIndex = this.sceneManager.getCurrentTrackIndex();
    this.playTrack(currentIndex - 1);
  }

  /**
   * Play next track
   */
  playNext() {
    const currentIndex = this.sceneManager.getCurrentTrackIndex();
    this.playTrack(currentIndex + 1);
  }

  /**
   * Set up audio event listeners
   */
  setupEventListeners() {
    // Play/pause button
    this.els.play.onclick = () => {
      this.els.audio.paused ? this.play() : this.pause();
    };

    // Previous/Next buttons
    this.els.prev.onclick = () => this.playPrevious();
    this.els.next.onclick = () => this.playNext();

    // Audio events
    this.els.audio.onplay = () => {
      updatePlayButton(this.els, true);
      updateVinylRotation(this.els, true);
    };

    this.els.audio.onpause = () => {
      updatePlayButton(this.els, false);
      updateVinylRotation(this.els, false);
    };

    this.els.audio.onloadedmetadata = () => {
      this.els.totalTime.textContent = formatTime(this.els.audio.duration);
    };

    this.els.audio.ontimeupdate = () => {
      if (!this.els.audio.duration) return;
      this.els.seek.value = Math.floor(100 * this.els.audio.currentTime / this.els.audio.duration);
      this.els.currentTime.textContent = formatTime(this.els.audio.currentTime);
    };

    // Seek bar
    this.els.seek.oninput = () => {
      if (!this.els.audio.duration) return;
      this.els.audio.currentTime = this.els.audio.duration * (this.els.seek.value / 100);
    };
  }

  /**
   * Set up keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (k === ' ') { 
        e.preventDefault(); 
        this.els.play.click(); 
      }
      if (k === 'arrowright') this.els.audio.currentTime += 5;
      if (k === 'arrowleft') this.els.audio.currentTime -= 5;
      if (k === 'n') this.els.next.click();
      if (k === 'p') this.els.prev.click();
    });
  }
}
